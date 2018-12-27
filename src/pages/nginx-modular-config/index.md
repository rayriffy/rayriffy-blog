---
title: จัดการ NGINX ได้อย่างสบายด้วยการแยกส่วน config อย่างเป็นระบบ
subtitle: ไม่มี caption คิดไม่ออก ;-;
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-05-06T09:30:00.000Z"
featured: false
type: blog
status: published
---

มาาาาจาากล่าวบทปายยยยยย....ถุ้ย! 55555

ย้อนรอยไปตอนที่แล้วที่สอนทำ [LEMP Stack](https://blog.rayriffy.com/post/2) อย่าง~~ยาก~~ง่ายไป คือตัว NGINX อ่ะมีความสามารถที่จะสามารถจัดการ Web Server ได้หลายๆ Domain ภายในตัวมันเองได้

แต่คราวนี้ปัญหาจะมา ถ้าเราเอา config ทุกอย่างไปลงที่ `nginx.conf` ที่เดียวเลย เวลามีหลายๆ Domain เข้าจำนวนบรรทัดอาจพุ่งเป็นระดับพันบรรทัดได้

![Server Burn](https://media.giphy.com/media/rftarkt7Ki2Gs/giphy.gif)

เพราะฉะนั้นริฟฟี่อัศวินม้าขาวจะมาช่วยแก้ปัญหาท่านให้เอง!!!!

## โครงสร้างไฟล์

อันนี้ผมยกตัวอย่างโครงสร้างอย่างง่ายให้ดูล่ะกัน

```
/etc/nginx
├── sites-enabled
│   └── example.com.conf
├── snippets
│   └── nginx-status-cats
│       ├── error
│       └── error-cat.conf
├── _general.conf
├── _php56.conf
├── _php56_fastcgi.conf
├── _php70.conf
├── _php70_fastcgi.conf
├── _ssl.conf
├── _wordpress.conf
└── nginx.conf
```

มา! อธิบายเป็นอันต่ออันให้รู้เรื่องก่อน

`site-enabled/` เป็น folder ที่จะใช้ในการตั้งค่า server แบบ 1 ไฟล์ต่อ Domain ไปเลย และเพื่อให้ง่ายต่อการหาผมก็ตั้งชื่อแบบ `<YOUR DOMAIN NAME>.conf` ไปเลย

`snippets/` เป็น folder ที่ไว้ใช้ลง custom module ต่างๆโดยอันนี้ผมให้แสดง HTTP error status เป็นรูปแมวน่าร๊ากกกก[แบบนี้](https://cdn.rayriffy.com/) ไปหาเล่นได้บน [GitHub](https://github.com/rayriffy/nginx-status-cats) ของผม (ขายของๆ 555)

`_general.conf` จะอุดมไปด้วย config พื้นฐานทุกอย่างที่แต่ละ Domain ควรมี

`_php` จะอุดมไปด้วย config PHP ล้วนๆ โดยเรียกผ่าน `_phpXX.conf` และแก้ไข config ที่ `_phpXX_fastcgi.conf`

`_ssl.conf` ระบุด้วย config SSL ทุกอย่างโดยที่สามารถเรียกไฟล์เดียวใช้กับทุกโดเมนแบบนี้ได้เพราะเรามี [Wildcard Certificate](https://blog.rayriffy.com/post/1) เย้!!

`_wordpress.conf` เผื่อใครใช้ Wordpress ก็ทำ config สำเร็จรูปให้พร้อม

> หลังจากนี้จะเริ่มแกะให้ดูทีละไฟล์ล่ะ พร้อมอธิบายเป็ส่วนๆ แต่ไม่ต้องห่วงมีซอสแจกให้

### nginx.conf

ไฟล์แบบ basic สุดๆเลย

```
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
  worker_connections 1024;
}

http {

  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  access_log /var/log/nginx/access.log main;

  charset utf-8;
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 40;
  types_hash_max_size 2048;
  client_body_timeout 20;
  reset_timedout_connection on;
  server_tokens off;
  client_max_body_size 16m;

  include mime.types;
  default_type application/octet-stream;

  # Load modular configuration files from the /etc/nginx/conf.d directory.
  # See http://nginx.org/en/docs/ngx_core_module.html#include
  # for more information.
  include /etc/nginx/conf.d/*.conf;
  server {
    listen 80;
    listen [::]:80;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name *.example.com;
    error_log /var/log/nginx/default.error;
    access_log /var/log/nginx/default.access;
    include _ssl.conf;
    location / {
      deny all;
      return 401;
    }
    include _general.conf;
  }
  include /etc/nginx/sites-enabled/*;
}
```
จะเห็นว่าผมเรียก `include /etc/nginx/sites-enabled/*;` คือให้ import config ทุกอย่างมาจาก `sites-enabled/` เวลาจะเพิ่ม-ลด Domain ก็แค่สร้าง-ลบไฟล์ง่ายๆไม่ต้องไปปวดหัวแก้หลายที่

และมี `server` block เอาไว้เป็น default ในกรณีที่มีเด็กเกรียนเข้ามาทาง IP ตรงๆ หรือถูกชี้มาจาก Domain ที่เราไม่ได้ตั้งค่าไว้ก็เอาอันนี้ดักไว้เลย

### _php56.conf

สังเกตุเห็นว่าผมตั้งเลขเวอร์ชั่นที่ชื่อไฟล์ด้วย...ใช่ เพราะ NGINX ก็สามารถเรียกใช้ PHP ได้หลายเวอร์ชั่นได้ด้วย

```
# index
index index.php;

# handle .php
location ~ \.php$ {
  include _php56_fastcgi.conf;
}
```

ก็..ไม่มีอะไรมาก บอก `index` และให้ไปเอา config สำหรับไฟล์ `.php` ที่ `_php56_fastcgi.conf`

### _php56_fastcgi.conf

```
try_files $uri =404;

# fastcgi
fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
fastcgi_index index.php;
fastcgi_split_path_info ^(.+\.php)(/.+)$;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
fastcgi_intercept_errors off;

fastcgi_buffer_size 128k;
fastcgi_buffers	256 16k;
fastcgi_busy_buffers_size 256k;
fastcgi_temp_file_write_size 256k;

# default fastcgi_params
include fastcgi_params;
```

อันนี้ก็บอกว่าให้ไปเรียก FPM สำหรับ PHP 5.6 ที่ `/var/run/php-fpm/php-fpm.sock` และก็ config ต่างๆเพิ่มเติม

### _ssl.conf

```
ssl_certificate /etc/letsencrypt/live/rayriffy.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/rayriffy.com/privkey.pem;

ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256;
ssl_prefer_server_ciphers on;

# HSTS (1 year, preload)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
```

จากตอนที่ผมสร้าง [Wildcard Certificate](https://blog.rayriffy.com/post/1) ก็เอามาใช้ในงานนี้แหล่! ก็เรียกไฟล์ SSL ที่สร้างมาโดยจะมีทั้งตัว certificate และ private key ใส่ไว้ที่ `ssl_certificate` และ `ssl_certificate_key` ตามลำดับ

ต่อมาด้วยตอนที่สร้าง [NGINX พร้อมกับ PageSpeed Module](https://blog.rayriffy.com/post/2) ผมเคยบ่นไว้ว่าจะใช้ `TLSv1.3` ก็เอามาใช้ใน `ssl_protocols` นี้แหล่เพื่อเพิ่มระดับความปลอดภับของการสื่อสารผมแนะนำว่าอย่าใช้ `TLSv1.1` เลคครับ แต่ก็ต้องแลกมากับ Web Browser เก่าๆจะเข้าเว็บเราไม่ได้เลย

ของแถมคือไหนๆเว็บเราก็จะใช้ HTTPS 100% ล่ะผมก็ขอแนะนำ `HSTS` โดยย่อมาจาก [HTTP Strict Transport Security](http://www.rfc-base.org/txt/rfc-6797.txt) โดยมันเป็น Website header ไว้ใช้ป้องกันการโดยขโมย cookie, SSL โดนแกะ หรือถูกโจมตีวิธีต่างๆ และเป็นตัวบังคับให้ Web Browser เชื่อมต่อผ่านทาง HTTPS เท่านั้นด้วย

### _general.conf

```
# pagespeed
pagespeed On;
pagespeed FileCachePath "/var/cache/ngx_pagespeed/";
pagespeed EnableFilters collapse_whitespace,combine_heads,flatten_css_imports,combine_css,combine_javascript,lazyload_images,resize_rendered_image_dimensions,rewrite_javascript,rewrite_images,rewrite_css;

# . files
location ~ /\. {
  deny all;
  return 401;
}

# assets, media
location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
  expires 7d;
  access_log off;
}

# ext include
include snippets/nginx-status-cats/error-cat.conf;
```

ไฟล์นี้ไม่ต้องอธิบายอะไรมาก ป้องกันการเข้าถึงไฟล์ที่ขึ้นต้นด้วย `.` ทั้งหมดและจัดการกับ media file ทุกอย่าง รวมถึงการตั้งค่า `pagespeed` ด้วย และมี `nginx-status-cat` เป็นของแถม

### _wordpress.conf

อันนี้ไม่ขออธิบาย แต่ง่ายๆว่าป้องการโดนปลิงไฟล์ไปใช้เว็บอื่นได้

> หลังจากรู้ทุกอย่างที่ควรรู้แล้วก็มาสร้าง server กันเลย

### sites-enabled/example.com.conf

```
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;

  pagespeed Off;
  server_name example.com;
  set $base /usr/share/nginx;
  root $base/$server_name;

  error_log /var/log/nginx/example.com.error;
  access_log /var/log/nginx/example.com.access;

  index index.html index.php;

  # SSL
  include _ssl.conf;

  # $uri, index.php
  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  include _general.conf;
  include _php56.conf;
}

# HTTP redirect
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  return 301 https://example.com$request_uri;
}
```
อย่างแรกเลย เพื่อให้ชัวร์ว่าคนใช้มาผ่านทาง HTTPS จริงเราปลอดภัยไว้ก่อนให้ redirect ไป HTTPS โดยอัตโนมัติถ้าผ่านมาจาก HTTP

จากนั้นก็ include ของพื้นฐานเข้าไป `_general.conf`,`_php56.conf`,`_ssl.conf` ถ้าเปิดเป็น Wordpress ก็อย่างลืมใส่ `_wordpress.conf ไปด้วยล่ะกัน`

ตำแหน่งการจัดเก็บไฟล์ (`root $base/$server_name;`) ก็เก็บเป็นระบบเช่นกันโดยเก็บไว้ที่ `/usr/share/nginx/` แล้วต่อด้วยชื่อโดเมน `example.com` ได้ path เต็มๆเป็น `/usr/share/nginx/example.com`

## สรุป

จากที่บอกเป็นไฟล์ต่อไฟล์ก็น่าจะเห็นว่าไฟล์เยอะสัส แต่แลกมาด้วยความง่ายในการแก้ไข และความที่เป็น module สามารถถอดเข้า-ออก ได้ตามสะดวก

และ...อย่าลืม! reload nginx ด้วยนะครับ 5555

```
$ systemctl restart nginx
```

## Bonus
![Source](https://media.giphy.com/media/9x5A9HAOqgfe0/giphy.gif)

ไปเอาโค๊ดที่ GitHub ได้เลย!!

[rayriffy/nginx-modular-config](https://github.com/rayriffy/nginx-modular-config)