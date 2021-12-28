import { OkPacket } from 'mysql'
import { exec } from '../db/mysql'

// 博客数据类型
type BlogData = {
  id?: number,
  title?: string,
  content?: string,
  createTime?: number,
  author?: string
}

/**
 * 获取博客列表
 * @param author 作者
 * @param keyword 关键字
 * @returns 博客列表
 */
export const blogList = (author = '', keyword = '') => {
  let sql = `SELECT id, title, content, createtime, author
    FROM blogs WHERE 1 = 1 `

  if (author) {
    sql += `AND author = '${author}' `
  }
  if (keyword) {
    sql += `AND content LIKE '%${keyword}%' `
  }
  sql += 'ORDER BY createtime DESC;'

  return exec(sql)
}

/**
 * 获取博客详情
 * @param id 博客 id
 * @returns 博客内容对象
 */
export const blogDetail = (id = 0) => {
  const sql = `SELECT id, title, content, createtime, author
  FROM blogs WHERE 1 = 1 AND id = ${id}; `

  return exec(sql).then(rows => (rows as object[])[0])
}

/**
 * 新建一篇博客
 * @param data 博客数据
 * @returns 新建完成的博客 id
 */
export const newBlog = (data: BlogData = {}) => {
  const { title, content, author } = data
  const createTime = Date.now()

  const sql = `INSERT INTO blogs (title, content, createtime, author)
    VALUES ('${title}', '${content}', ${createTime}, '${author}');
  `

  return exec(sql).then(insertData => {
    return { id: (insertData as OkPacket).insertId }
  })
}

/**
 * 使用博客数据更新指定 id 的博客
 * @param id 博客 id
 * @param data 博客数据
 * @returns 是否更新成功
 */
export const updateBlog = (id: number, data = {}) => {
  console.log('Update Blog =>', data)

  return true
}

/**
 * 删除指定 id 的博客
 * @param id 博客 id
 * @returns 是否删除成功
 */
export const deleteBlog = (id: number) => {
  console.log(`DELETE ${id} 的博客`)

  return true
}
