package main

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"
	"runtime"
)

func main() {
	var args []string
	if runtime.GOOS == "windows" {
		args = []string{
			"assembleRelease",
		}
		execCommand("gradlew", args)
	} else {
		args = []string{
			"./gradlew",
			"assembleRelease",
		}
		execCommand("bash", args)
	}
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
