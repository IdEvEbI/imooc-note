import * as mysql from 'mysql'

// 环境参数
const env = process.env.NODE_ENV

// 数据库连接配置
export let MYSQL_CONF: mysql.ConnectionConfig = {}

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'centos.local',
    user: 'heima',
    password: '123456',
    port: 3306,
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'centos.local',
    user: 'heima',
    password: '123456',
    port: 3306,
    database: 'myblog'
  }
}
