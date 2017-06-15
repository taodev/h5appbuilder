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
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:AuthController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:AuthController"],
		beego.ControllerComments{
			Method: "LoginOptions",
			Router: `/login`,
			AllowHTTPMethods: []string{"options"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"],
		beego.ControllerComments{
			Method: "UploadIcon",
			Router: `/icon`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"],
		beego.ControllerComments{
			Method: "UploadIconOptions",
			Router: `/icon`,
			AllowHTTPMethods: []string{"options"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"],
		beego.ControllerComments{
			Method: "Build",
			Router: `/build`,
			AllowHTTPMethods: []string{"post"},
			MethodParams: param.Make(),
			Params: nil})

	beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"] = append(beego.GlobalControllerRouter["github.com/taodev/h5appbuilder/buildserver/controllers:UploadController"],
		beego.ControllerComments{
			Method: "BuildOptions",
			Router: `/build`,
			AllowHTTPMethods: []string{"options"},
			MethodParams: param.Make(),
			Params: nil})

}
