# node.js 作为服务端的练习项目

### 项目主要结构

1. 用户管理

2. 内容管理

3. 评论管理

4.  文件管理

### 项目结构
|   文件夹名称   | 功能 |
| -----------  | --- |
| app          | 全局相关的一些 |
| controller   | 控制器 |
| service      | 数据库操作相关 |
| router       | 路由相关 |
| utils        | 工具相关 |

### 项目说明

- 加密使用的非对称加密私钥和公钥都未上传，需要自己使用 `openssl` 生成
```js
  `genrsa -out private.key 1024`
  `rsa -in private.key -pubout -out public.key`

```