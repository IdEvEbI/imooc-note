/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns 是否登录成功
 */
export const userLogin = (username: string, password: string) => {
  return (username === 'zhangsan' && password === '123')
}
