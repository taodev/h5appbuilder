package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

//用户表
type BuildTask struct {
	Id               int64
	UserId           int64     `orm:"column(userid)"`
	Username         string    `orm:"size(32)" form:"Username"  valid:"Required;MaxSize(20);MinSize(6)"`
	Createtime       time.Time `orm:"type(datetime);auto_now_add" `
	Status           int       `orm:"default(0)"`
	ApkPath          string    `orm:"column(apkpath);size(128)"`
	GameName         string    `orm:"column(gamename);size(128)"`
	PackageName      string    `orm:"column(packagename);size(128)"`
	GameURL          string    `orm:"column(gameurl);size(256)"`
	TalkingADAppID   string    `orm:"column(talkingad_appid);size(128)"`
	TalkingADChannel string    `orm:"column(talkingad_channel);size(128)"`
	Icon             string    `orm:"size(256)"`
	RoundIcon        string    `orm:"column(roundicon);size(256)"`
	Splash           string    `orm:"size(256)"`
}

func (u *BuildTask) TableName() string {
	return "build_task_table"
}

func init() {
	orm.RegisterModel(new(BuildTask))
}

func BuildTask_Add(task *BuildTask) (int64, error) {
	o := orm.NewOrm()
	var newTask BuildTask
	newTask = *task
	newTask.Id = 0
	newTask.Createtime = time.Now()
	newTask.Status = 0

	id, err := o.Insert(&newTask)
	return id, err
}
