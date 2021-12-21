# CentOS 安装笔记

> CentOS Linux release 7.9.2009 (Core)。

## 1. 常用工具安装

1. 系统升级

   ```bash
   yum update && yum upgrade

   # 列出所有已安装的软件包
   yum list installed
   ```

2. Git

   ```bash
   yum install -y git
   ```

3. Vim 8.0

   ```bash
   rpm -Uvh http://mirror.ghettoforge.org/distributions/gf/gf-release-latest.gf.el7.noarch.rpm
   rpm --import http://mirror.ghettoforge.org/distributions/gf/RPM-GPG-KEY-gf.el7

   yum -y remove vim-minimal vim-common vim-enhanced
   yum -y --enablerepo=gf-plus install vim-enhanced sudo
   ```

4. net-tools

   ```bash
   yum install -y net-tools
   ```

5. wget

   ```bash
   yum install -y wget
   ```

## 2. Node.js

1. 添加 Node.js 的 yum 源

   ```bash
   # LTS 版本
   curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
   ```

2. 安装

   ```bash
   yum install -y nodejs
   ```

3. 确认安装

   ```bash
   node -v

   npm -v
   ```

## 3. MySQL 5.7

1. 安装 MySQL

   ```bash
   rpm -Uvh https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm

   # 安装
   yum install mysql-community-server
   ```

2. 启动 MySQL

   ```bash
   # 启动服务
   systemctl start mysqld

   # 设定开机自动启动
   systemctl enable mysqld
   ```

3. 安全设置

   ```bash
   # 查看安装生成的随机密码
   grep 'temporary password' /var/log/mysqld.log

   # 安装 MySQL 安全
   mysql_secure_installation
   ```

4. 防火墙设置

   ```bash
   # 添加 MySQL 的防火墙端口
   firewall-cmd --zone=public --add-port=3306/tcp --permanent

   # 重启防火墙
   firewall-cmd --reload

   # 查看防火墙状态
   firewall-cmd --state

   # 检查防火墙设置
   firewall-cmd --zone=public --list-all

   # 查看防火墙端口列表
   firewall-cmd --list-ports
   ```

5. 进入 MySQL

   ```bash
   mysql -u root -p
   ```

   ```sql
   -- 查看用户
   SELECT User, Host FROM mysql.user;

   -- 新增用户
   CREATE USER '{account}'@'{ip}' IDENTIFIED BY '{password}';
   FLUSH PRIVILEGES;

   -- 修改用户
   ALTER USER '{account}'@'{ip}' IDENTIFIED BY '{password}';
   FLUSH PRIVILEGES;

   -- 删除用户
   DROP USER '{account}'@'{ip}';
   FLUSH PRIVILEGES;
   ```

6. 设置安全级别

   ```sql
   SHOW VARIABLES LIKE 'validate_password%';

   SET GLOBAL validate_password_length = 6;
   SET GLOBAL validate_password_policy = LOW;
   ```

7. 允许远程访问

   ```sql
   -- 允许远程访问
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   ```

## 4. Redis 6.x

1. 允许 Remi 仓库

   ```bash
   yum install epel-release yum-utils
   yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
   yum-config-manager --enable remi
   ```

2. 安装 Redis

   ```bash
   yum install redis
   ```

3. 启动服务

   ```bash
   systemctl start redis
   systemctl enable redis
   ```

4. 检查服务状态

   ```bash
   systemctl status redis
   ```
