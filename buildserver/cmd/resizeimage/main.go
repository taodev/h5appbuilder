package main

import (
	"flag"
	"image/png"
	"log"
	"os"

	"github.com/nfnt/resize"
)

func resizeFile(inputFile string, outputFile string, w, h uint) {
	file, err := os.Open(inputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	img, err := png.Decode(file)
	if err != nil {
		log.Fatal(err)
	}

	m := resize.Resize(w, h, img, resize.Bilinear)

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

func main() {
	inputFile := flag.String("input-file", "", "源文件路径")
	outputFile := flag.String("output-file", "", "输出文件路径")
	width := flag.Uint("width", 0, "目标宽度")
	height := flag.Uint("height", 0, "目标高度")

	flag.Parse()

	resizeFile(*inputFile, *outputFile, *width, *height)
}
