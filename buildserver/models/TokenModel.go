package models

import (
	"sync"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/cache"
	"github.com/taodev/h5appbuilder/buildserver/extlibs"
)

var (
	tokenCache  cache.Cache
	tokenLocker sync.RWMutex
)

func NewToken(username string) string {
	tokenLocker.Lock()
	defer tokenLocker.Unlock()

	var token string
	for {
		token = string(extlibs.RandString(32, extlibs.RAND_KIND_ALL))
		if !tokenCache.IsExist(token) {
			tokenCache.Put(token, username, time.Hour*2)
			break
		}
	}

	return token
}

func TokenCheck(token string) bool {
	tokenLocker.RLock()
	defer tokenLocker.RUnlock()

	if !tokenCache.IsExist(token) {
		return false
	}

	return true
}

func init() {
	var err error
	tokenCache, err = cache.NewCache("file", `{"CachePath":"./cache","FileSuffix":".cache","DirectoryLevel":2,"EmbedExpiry":120}`)
	if err != nil {
		beego.Error(err)
	}
}
