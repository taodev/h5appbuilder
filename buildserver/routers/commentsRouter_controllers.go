package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:AuthController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:AuthController"],
		beego.ControllerComments{
			Method: "Login",
			Router: `/login`,
			AllowHTTPMethods: []string{"*"},
			MethodParams: param.Make(),
			Params: nil})

}
