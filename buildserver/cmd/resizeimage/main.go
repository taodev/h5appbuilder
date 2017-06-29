package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"image/png"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/nfnt/resize"
)

var (
	inputFile    string
	outputFile   string
	width        uint
	height       uint
	useTinyPNG   bool
	emailTinyPNG string
	keyTinyPNG   string
)

func resizeFile() {
	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	img, err := png.Decode(file)
	if err != nil {
		log.Fatal(err)
	}

	m := resize.Resize(width, height, img, resize.Bilinear)

	out, err := os.Create(outputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()

	err = png.Encode(out, m)
	if err != nil {
		log.Fatal(err)
	}
}

type TinyPNGInputArgs struct {
	Size int64  `json:"size"`
	Type string `json:"type"`
}

type TinyPNGOutputArgs struct {
	Size   int64   `json:"size"`
	Type   string  `json:"type"`
	Width  int     `json:"width"`
	Height int     `json:"height"`
	Ratio  float64 `json:"ratio"`
	URL    string  `json:"url"`
}

type TinyPNGResponse struct {
	Input  TinyPNGInputArgs  `json:"input"`
	Output TinyPNGOutputArgs `json:"output"`
}

func tinypngCompress() {
	req, err := http.NewRequest(http.MethodPost, "https://api.tinify.com/shrink", nil)
	if err != nil {
		log.Fatal(err)
		return
	}

	req.SetBasicAuth(emailTinyPNG, keyTinyPNG)
	data, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatal(err)
		return
	}

	req.Body = ioutil.NopCloser(bytes.NewReader(data))

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
		return
	}

	data, err = ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Print(string(data))

	var result TinyPNGResponse
	err = json.Unmarshal(data, &result)
	if err != nil {
		log.Fatal(err)
		return
	}

	// 开始下载
	res, err := http.Get(result.Output.URL)
	if err != nil {
		log.Fatal(err)
		return
	}

	f, err := os.Create(outputFile)
	if err != nil {
		log.Fatal(err)
		return
	}

	n, err := io.Copy(f, res.Body)
	if err != nil {
		log.Fatal(err)
		return
	}

	log.Printf("input:	%s\noutput:	%s\nwidth:	%d\nheight:	%d\nradio:	%f\nsize:	%d\n", inputFile, outputFile, result.Output.Width, result.Output.Height, result.Output.Ratio, n)
}

func main() {
	flag.StringVar(&inputFile, "input-file", "", "源文件路径")
	flag.StringVar(&outputFile, "output-file", "", "输出文件路径")
	flag.UintVar(&width, "width", 0, "目标宽度")
	flag.UintVar(&height, "height", 0, "目标高度")
	flag.BoolVar(&useTinyPNG, "use-tinypng", false, "是否使用TinyPNG压缩图片")
	flag.StringVar(&emailTinyPNG, "tinypng-email", "", "TinyPNG email")
	flag.StringVar(&keyTinyPNG, "tinypng-key", "", "TinyPNG Key")

	flag.Parse()

	if useTinyPNG {
		tinypngCompress()
		return
	}

	resizeFile()
}
