package home

import "github.com/go-xorm/xorm"

var db *xorm.Engine

func Init(DB *xorm.Engine) {
	db = DB
}

type stockData struct {
}