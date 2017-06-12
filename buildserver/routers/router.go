package routers

import (
	"github.com/taodev/h5appbuilder/buildserver/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
