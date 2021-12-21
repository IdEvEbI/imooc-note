/**
 * 获取博客列表
 * @param _author 作者
 * @param keyword 关键字
 * @returns 博客列表
 */
export const blogList = (author = '', keyword = '') => {
  return [
    {
      id: 1,
      title: '标题 A',
      content: '博客内容 A',
      createtime: 1640031817776,
      author
    },
    {
      id: 2,
      title: '标题 B',
      content: '博客内容B',
      createtime: 1640031817790,
      author
    }
  ]
}

/**
 * 获取博客详情
 * @param id 博客 id
 * @returns 博客内容对象
 */
export const blogDetail = (id = 1) => {
  return {
    id,
    title: '标题 A',
    content: '博客内容 A',
    createtime: 1640031817776,
    author: 'zhangsan'
  }
}

/**
 * 新建一篇博客
 * @param data 博客数据
 * @returns 新建完成的博客数据
 */
export const newBlog = (data = {}) => {
  return {
    id: 1 + Math.floor(Math.random() * 10),
    createtime: Date.now(),
    ...data
  }
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
