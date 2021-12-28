import { exec } from '../db/mysql'

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns 用户信息记录
 */
export const userLogin = (username: string, password: string) => {
  const sql = `SELECT username, realname
    FROM users
    WHERE username = '${username}' AND password = '${password}';`

  return exec(sql).then(rows => (rows as object[])[0])
}
