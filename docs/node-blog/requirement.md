# 需求与技术方案

## 1. 目标

- 开发一个博客系统，具有博客的基础功能
- 只开发 server 端，不关心前端

## 2. 需求

- 首页、作者主页、详情页
- 登录页
- 管理中心、新建页、编辑页

## 3. 技术方案

### 3.1 数据存储

1. 博客表

   | 字段       | 说明     |
   | ---------- | -------- |
   | id         | id       |
   | title      | 博客标题 |
   | content    | 博客内容 |
   | createtime | 创建时间 |
   | author     | 作者     |

2. 用户

   | 字段     | 说明   |
   | -------- | ------ |
   | id       | id     |
   | username | 用户名 |
   | password | 密码   |
   | nickname | 昵称   |

### 3.2 接口设计

| 接口             | 方法 | 参数                            | 备注                      |
| ---------------- | ---- | ------------------------------- | ------------------------- |
| /api/blog/list   | GET  | author 作者，keyword 搜索关键字 | 参数为空则不进行过滤      |
| /api/blog/detail | GET  | id                              |                           |
| /api/blog/new    | POST |                                 | post 中有新增的信息       |
| /api/blog/update | POST | id                              | postData 中有更新的信息   |
| /api/blog/del    | POST | id                              |                           |
| /api/user/login  | POST |                                 | postData 中有用户名和密码 |
