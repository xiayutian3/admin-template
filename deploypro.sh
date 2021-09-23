#!/usr/bin/env 

# 复制传输文件 生产环境
scp -r -C ./dist/* root@44.193.243.127:/usr/share/nginx/html/disk_yy/

# 删除dist文件夹

