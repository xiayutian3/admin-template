#!/usr/bin/env sh

# git拉取最新代码
git pull

# 构建
npm run build

# 删除部署相应目录的dist代码
rm -rf /usr/share/nginx/html/ad_front/disk/*

# 将打包后的代码部署到相应的目录
scp -r -C ./dist/* /usr/share/nginx/html/ad_front/disk/

# 删除打包后的文件
rm -rf ./dist

# 部署完成！