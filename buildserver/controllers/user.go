package controllers

import (
	"github.com/astaxie/beego"
	m "github.com/taodev/h5appbuilder/buildserver/models"
)

// Operations about object
type UserController struct {
	beego.Controller
}

// @router /add [post]
func (c *UserController) Add() {
	var user m.User
	c.ParseForm(&user)

	_, err := m.AddUser(&user)
	if err != nil {

	}

	c.ServeJSON()
}

// @router / [post]
func (c *UserController) GetAll() {
	var req QueryAppArgs
	c.ParseForm(&req)

	result, count := m.UserModel_Query(int64(req.Count), int64(req.Page), req.SortField, req.SortOrder)

	for _, v := range result {
		_, ok := v["Password"]
		if ok {
			delete(v, "Password")
		}
	}

	beego.Debug("result", len(result))

	c.Data["json"] = &QueryTableResp{
		Results: result,
		Count:   count,
	}
	c.ServeJSON()
}
