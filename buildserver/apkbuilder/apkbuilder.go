package apkbuilder

import (
	"bufio"
	"encoding/xml"
	"fmt"
	"image/png"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/nfnt/resize"
	m "github.com/taodev/h5appbuilder/buildserver/models"
)

var BuildChan chan *m.BuildTask
var WorkDir string
var AppDir string

func buildThread() {
	beego.Info("Build Thread start.")
	defer func() {
		beego.Info("Build Thread stop.")
	}()

	for {
		task, ok := <-BuildChan
		if !ok {
			return
		}

		beego.Info("Build Task start...", task.Icon)
		runTask(task, WorkDir)
	}
}

func runTask(task *m.BuildTask, workdir string) {
	workdir, _ = filepath.Abs(workdir)

	setupAppID(task, workdir)
	setupStrings(task, workdir)

	now := time.Now()
	nowString := now.Format("20060102150405")

	cmd := filepath.Join(AppDir, "buildapk")
	if runtime.GOOS == "windows" {
		args := []string{
			AppDir,
			workdir,
			task.GameName,
			nowString,
			fmt.Sprintf("%d", task.Id),
			task.Icon,
			task.RoundIcon,
			task.Splash,
		}
		execCommand(cmd, args)
	} else {
		args := []string{
			cmd,
			AppDir,
			workdir,
			task.GameName,
			nowString,
			fmt.Sprintf("%d", task.Id),
			task.Icon,
			task.RoundIcon,
			task.Splash,
		}
		execCommand("bash", args)
	}
}

type Resources struct {
	XMLName        xml.Name         `xml:resources`
	ResourceString []ResourceString `xml:"string"`
}

type ResourceString struct {
	XMLName    xml.Name `xml:string`
	StringName string   `xml:"name,attr"`
	InnerText  string   `xml:",innerxml"`
}

func setupAppID(task *m.BuildTask, workdir string) {
	templatePath := filepath.Join(workdir, "app/build.gradle.template")
	outputPath := filepath.Join(workdir, "app/build.gradle")
	contentBytes, err := ioutil.ReadFile(templatePath)
	if err != nil {
		beego.Error(err)
		return
	}
	content := string(contentBytes)
	newContent := strings.Replace(content, `applicationId 'taodev.h5app'`, fmt.Sprintf(`applicationId '%s'`, task.PackageName), 1)
	ioutil.WriteFile(outputPath, []byte(newContent), os.ModeAppend)
}

func setupStrings(task *m.BuildTask, workdir string) {
	stringsPath := filepath.Join(workdir, "app/src/main/res/values/strings.xml")
	content, err := ioutil.ReadFile(stringsPath)
	if err != nil {
		beego.Error(err)
		return
	}

	var resources Resources
	err = xml.Unmarshal(content, &resources)
	if err != nil {
		beego.Error(err)
		return
	}

	for i, node := range resources.ResourceString {
		if strings.EqualFold(node.StringName, "app_name") {
			resources.ResourceString[i].InnerText = task.GameName
		} else if strings.EqualFold(node.StringName, "gameurl") {
			resources.ResourceString[i].InnerText = task.GameURL
		} else if strings.EqualFold(node.StringName, "talkingad_appid") {
			resources.ResourceString[i].InnerText = task.TalkingADAppID
		} else if strings.EqualFold(node.StringName, "talkingad_channel") {
			resources.ResourceString[i].InnerText = task.TalkingADChannel
		}
	}

	xmlOutput, err := xml.MarshalIndent(resources, "", "    ")
	if err != nil {
		beego.Error(err)
		return
	}

	ioutil.WriteFile(stringsPath, xmlOutput, os.ModeAppend)
}

func resizeImages(task *m.BuildTask, workdir string) {
	cmd := filepath.Join(AppDir, "setup_image")
	args := []string{AppDir + "/html/upload", workdir, task.Icon, task.RoundIcon, task.Splash}
	execCommand(cmd, args)
}

func resizeFile(inputFile string, outputFile string, w, h int) error {
	file, err := os.Open(inputFile)
	if err != nil {
		beego.Error(err)
		return err
	}
	defer file.Close()

	img, err := png.Decode(file)
	if err != nil {
		beego.Error(err)
		return err
	}

	m := resize.Resize(uint(w), uint(h), img, resize.Bilinear)

	out, err := os.Create(outputFile)
	if err != nil {
		beego.Error(err)
		return err
	}
	defer out.Close()

	err = png.Encode(out, m)
	if err != nil {
		beego.Error(err)
		return err
	}

	return nil
}

func execCommand(commandName string, params []string) bool {
	cmd := exec.Command(commandName, params...)

	//显示运行的命令
	fmt.Println(cmd.Args)

	stdout, err := cmd.StdoutPipe()

	if err != nil {
		fmt.Println(err)
		return false
	}

	cmd.Start()

	reader := bufio.NewReader(stdout)

	//实时循环读取输出流中的一行内容
	for {
		line, err2 := reader.ReadString('\n')
		if err2 != nil || io.EOF == err2 {
			break
		}
		fmt.Println(line)
	}

	cmd.Wait()
	return true
}

func init() {
	AppDir, _ = os.Getwd()
	WorkDir = beego.AppConfig.String("workdir")
	WorkDir, _ = filepath.Abs(WorkDir)
	BuildChan = make(chan *m.BuildTask, 16)
	go buildThread()
}
