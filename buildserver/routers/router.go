package routers

import (
	"github.com/astaxie/beego"
	"github.com/taodev/h5appbuilder/buildserver/controllers"
)

func init() {
	beego.Router("/", &controllers.IndexController{})

	beego.Router("/", &controllers.IndexController{})

	ns := beego.NewNamespace("/api/v1",
		beego.NSNamespace("/auth",
			beego.NSInclude(
				&controllers.AuthController{},
			),
		),
		beego.NSNamespace("/upload",
			beego.NSInclude(
				&controllers.UploadController{},
			),
		),
	)
	beego.AddNamespace(ns)
}
