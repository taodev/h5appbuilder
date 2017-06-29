package models

import (
	"fmt"
	"time"

	"github.com/astaxie/beego/orm"
)

// 应用表
type AppTable struct {
	Id         int64
	Appname    string    `orm:"column(appname);size(32)"`
	UserId     int64     `orm:"column(userid)"`
	Username   string    `orm:"size(32)" form:"Username"  valid:"Required;MaxSize(20);MinSize(6)"`
	Createtime time.Time `orm:"type(datetime);auto_now_add" `
}

func (a *AppTable) AppTable() string {
	return "app_table"
}

func init() {
	orm.RegisterModel(new(AppTable))
}

func AppModel_Query(count int, page int, sortField string, sortOrder string) ([]AppTable, error) {
	var result []AppTable
	var err error

	o := orm.NewOrm()

	var orderSql string

	if len(sortField) > 0 {
		sortSql := ""
		if sortOrder == "descend" {
			sortSql = " DESC"
		}
		orderSql = fmt.Sprintf("ORDER BY %s%s", sortField, sortSql)
	}

	var limitSql string
	if count > 0 {
		limitSql = "LIMIT "
		if page > 0 {
			limitSql += fmt.Sprintf("%d, ", count*page)
		}

		limitSql += fmt.Sprintf("%d", count)
	}

	num, err := o.Raw("SELECT * FROM app_table ? ?", orderSql, limitSql).QueryRows(&result)
	if err != nil {
		fmt.Println("app nums: ", num)
	}

	return result, err
}
