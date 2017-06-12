package controllers

import (
	"encoding/json"
	"errors"
	"time"

	"github.com/astaxie/beego"
	jwt "github.com/dgrijalva/jwt-go"
	. "github.com/taodev/h5appbuilder/buildserver/extlibs"
	m "github.com/taodev/h5appbuilder/buildserver/models"
)

// Operations about object
type AuthController struct {
	beego.Controller
}

type MsgLoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type MsgLoginRet struct {
	Code    int
	Message string
	Token   string
}

// @router /login [*]
func (c *AuthController) Login() {
	var result MsgLoginRet
	c.Data["json"] = &result

	var req MsgLoginRequest
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &req)
	if err != nil {
		result.Code = -1
		result.Message = err.Error()
		c.ServeJSON()
		return
	}

	beego.Debug(req)
	user, err := CheckLogin(req.Username, req.Password)
	if err != nil {
		result.Code = -1
		result.Message = err.Error()
		c.ServeJSON()
		return
	}

	beego.Debug(user)

	result.Code = 0
	result.Message = "登陆成功"
	result.Token = m.NewToken(req.Username)
	c.ServeJSON()
}

func CheckLogin(username string, password string) (user m.User, err error) {
	user = m.GetUserByUsername(username)
	if user.Id == 0 {
		return user, errors.New("用户不存在")
	}
	if user.Password != Pwdhash(password) {
		return user, errors.New("密码错误")
	}

	return user, nil
}

var (
	key []byte = []byte("-jwt-123456")
)

func GenToken(username string) string {
	claims := &jwt.StandardClaims{
		NotBefore: int64(time.Now().Unix()),
		ExpiresAt: int64(time.Now().Unix() + 60*60*2),
		Issuer:    username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(key)
	if err != nil {
		beego.Error(err)
		return ""
	}

	return ss
}

//func authCheck(username, password string) bool {
//	return username == "admin" && password == "litao"
//}

func init() {
	// authPlugin := auth.NewBasicAuthenticator(authCheck, "Error")
	// beego.InsertFilter("*", beego.BeforeRouter, authPlugin)
}
