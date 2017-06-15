package main

import (
	"mime"
	"os"
	"time"

	"github.com/taodev/h5appbuilder/buildserver/models"
	_ "github.com/taodev/h5appbuilder/buildserver/routers"

	"github.com/astaxie/beego"

	_ "github.com/taodev/h5appbuilder/buildserver/apkbuilder"
)

func initialize() {
	mime.AddExtensionType(".css", "text/css")
	initArgs()
	models.Connect()
}

func initArgs() {
	args := os.Args
	for _, v := range args {
		if v == "-syncdb" {
			models.Syncdb()
			os.Exit(0)
		}
	}
}

func main() {
	initialize()

	beego.Debug(time.Now().UnixNano())

	// 设置静态目录
	beego.SetStaticPath("/html", "html")
	beego.SetStaticPath("/static", "html/static")

	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}

	//	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
	//		// AllowOrigins: []string{"http://localhost:8000"},
	//		AllowAllOrigins: true,
	//		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	//		AllowHeaders: []string{
	//			"Origin",
	//			"Authorization",
	//			"Access-Control-Allow-Origin",
	//			"Access-Control-Allow-Headers",
	//			"Content-Type",
	//			"X-Requested-With",
	//			"X-H5APP-ACCOUNT",
	//			"X-H5APP-TOKEN",
	//		},
	//		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
	//		AllowCredentials: true,
	//	}))

	beego.Run()
}
