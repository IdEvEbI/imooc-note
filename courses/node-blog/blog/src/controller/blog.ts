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
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题 B',
      content: '博客内容B',
      createtime: 1640031817790,
      author: 'lisi'
    },
  ]
}