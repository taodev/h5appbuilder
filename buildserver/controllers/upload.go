package controllers

import (
	"fmt"
	"time"

	"github.com/astaxie/beego"
	"github.com/taodev/h5appbuilder/buildserver/apkbuilder"
	m "github.com/taodev/h5appbuilder/buildserver/models"
)

// Operations about object
type UploadController struct {
	beego.Controller
}

type UploadResponse struct {
	Status  string `json:"status"`
	URL     string `json:"url"`
	Message string `json:"message"`
}

type UploadResult struct {
	UID    string `json:"uid"`
	Name   string `json:"name"`
	Status string `json:"status"`
	// Response UploadResponse `json:"response"`
	URL     string `json:"url"`
	Message string `json:"message"`
}

// @router /icon [post]
func (c *UploadController) UploadIcon() {
	iconType := c.GetString("icon_type", "icon")
	// iconName := iconType + "_image"

	var result UploadResult

	file, header, err := c.GetFile("file")
	if err != nil {
		beego.Warn(err)
		result.UID = "-1"
		result.Status = "error"
		result.Message = err.Error()
		c.Data["json"] = result
		c.ServeJSON()
		return
	}

	filename := fmt.Sprintf("%s_%d.png", iconType, time.Now().UnixNano())
	path := "./html/upload/" + filename
	file.Close()

	err = c.SaveToFile("file", path)
	if err != nil {
		beego.Warn(err)
		result.UID = "-1"
		result.Status = "error"
		result.Message = err.Error()
		c.Data["json"] = result
		c.ServeJSON()
		return
	}

	result.UID = "101"
	result.Name = header.Filename
	result.Status = "done"
	result.URL = filename
	result.Message = "上传成功"

	c.Data["json"] = result
	c.ServeJSON()
}

// @router /icon [options]
func (c *UploadController) UploadIconOptions() {
	c.Data["json"] = "OK"
	c.ServeJSON()
}

type BuildArgs struct {
	GameName         string `form:"gamename"`
	PackageName      string `form:"packagename"`
	GameURL          string `form:"gameurl"`
	TalkingADAppID   string `form:"talkingad_appid"`
	TalkingADChannel string `form:"talkingad_channel"`
	Icon             string `form:"icon"`
	RoundIcon        string `form:"round_icon"`
	Splash           string `form:"splash"`
}

type BuildResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

// @router /build [post]
func (c *UploadController) Build() {
	account := c.Ctx.Input.Header("X-H5APP-ACCOUNT")
	token := c.Ctx.Input.Header("X-H5APP-TOKEN")
	beego.Debug("account:", account, "token", token)

	var args BuildArgs
	var result BuildResult

	err := c.ParseForm(&args)
	if err != nil {
		result.Code = -1
		result.Message = err.Error()
		c.Data["json"] = result
		c.ServeJSON()
		return
	}

	beego.Debug(args)

	var task m.BuildTask
	task.Username = account
	task.GameName = args.GameName
	task.PackageName = args.PackageName
	task.GameURL = args.GameURL
	task.TalkingADAppID = args.TalkingADAppID
	task.TalkingADChannel = args.TalkingADChannel
	task.Icon = args.Icon
	task.RoundIcon = args.RoundIcon
	task.Splash = args.Splash
	id, err := m.BuildTask_Add(&task)
	if err != nil {
		result.Code = -1
		result.Message = err.Error()
		c.Data["json"] = result
		c.ServeJSON()
		return
	}

	result.Code = 0
	result.Message = "提交成功"

	task.Id = id
	apkbuilder.BuildChan <- &task

	c.Data["json"] = result
	c.ServeJSON()
}

// @router /build [options]
func (c *UploadController) BuildOptions() {
	c.Data["json"] = "OK"
	c.ServeJSON()
}
