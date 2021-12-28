import * as mysql from 'mysql'
import { MYSQL_CONF } from '../conf/db'

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

export const exec = (sql: string) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}
