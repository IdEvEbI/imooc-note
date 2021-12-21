import * as mysql from 'mysql'

// 创建连接对象
const con = mysql.createConnection({
    host: 'centos.local',
    user: 'heima',
    password: '123456',
    port: 3306,
    database: 'myblog'
})

// 开始连接
con.connect()

// 执行 SQL 语句
const sql = 'SELECT id, username, password, realname FROM users;'

con.query(sql, (err, result) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(result)
})

// 关闭连接
con.end()