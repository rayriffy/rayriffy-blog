---
title: ติดตั้ง LEMP Stack และเพิ่มความเร็วของเว็บไซต์ของคุณด้วย NGINX PageSpeed Module
subtitle: สอนติดตั้ง LEMP Stack และ NGINX PageSpeed Module
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-05-01T05:37:00.000Z"
featured: false
type: blog
status: published
---

ใน Tutorial นี้จะสอนอยู่ 2 อย่าง
 - ติดตั้ง LEMP stack (**L**inux, **E**Nginx, **M**ySQL, **P**HP)
 - ติดตั้ง NGINX PageSpeed Module

โดย LEMP stack เพราะเป็นการรวม software พื้นฐานที่จะสามารถทำให้เครื่องเซิร์ฟเวอร์ให้บริการเว็บไซต์แบบ dynamic ได้นั่นเอง

## ขั้นตอนที่ 1: อัพเดต

แน่นอน ก่อนจะทำบ้าอะไรต้องทำให้ OS เรามีอัพเดตล่าสุดก่อน

### Ubuntu

```
$ apt-get update
```

ลง `systemctl` ไว้ใช้จัดการ service

```
$ apt-get install systemd
```

### CentOS

```
$ yum update
```

## ขั้นตอนที่ 2: ติดตั้ง NGINX

> ขั้นตอนนี้เหมาะสำหรับผู้เริ่มต้นทั่วไป สำหรับใครที่ต้องการติดตั้ง NGINX PageSpeed Module กรุณาข้ามไปที่ขั้นตอนที่ 2.5 ...ขอบคุณครับ

การที่จะส่งหน้าเว็บไปแสดงผลที่ผู้ใช้ได้นั้น เราจะใช้ `NGINX` ซึ่งจะเป็น Web Server ที่ทันสมัยกว่า `httpd` นิดนึง (customize ง่ายกว่าด้วย)

### Ubuntu

```
$ apt-get install nginx
```

### CentOS

ของ CentOS จะต้องเล่น**ท่ายาก**นิดนึง โดยจะต้องติดตั้ง EPEL Repository ก่อน

```
$ yum install epel-release
```

แล้วค่อยติดตั้ง NGINX

```
$ yum install nginx
```

แล้วก็เปิด service ขึ้นมาเลย และตั้งให้ start เองเมื่อเปิดเครื่องใหม่ด้วย

```
$ systemctl start nginx
$ systemctl enable nginx
```
## ขั้นตอนที่ 2.5: ติดตั้ง NGINX พร้อม PageSpeed Module

เราจะติดตั้งโดยใช้คำสั่งตรงๆไม่ได้ ต้อง compile มาเองใหม่หมด

เริ่มด้วยการเตรียมอุปกรณ์ที่จะไว้ใช้ compile ก่อน

### Ubuntu

```
$ apt-get install build-essential zlib1g-dev libpcre3 libpcre3-dev unzip uuid-dev
```

### CentOS

```
$ yum install gcc cmake unzip wget gcc-c++ pcre-devel zlib-devel
```

จากนั้นก็ดาวน์โหลด NGINX โดยจะเลือกเป็นเวอร์ชั่น `1.13.2` เพราะมันรองรับ TLSv1.3 55555555

```
$ wget http://nginx.org/download/nginx-1.13.12.tar.gz
```

และอย่าลืมพระเอกของเรา ngx_pagespeed

```
$ wget https://github.com/apache/incubator-pagespeed-ngx/archive/v1.13.35.2-stable.zip
```

หลังจากดาวน์โหลดทุกอย่างเสร็จแล้วก็แตกไฟล์ออกมาได้เลย

```
$ tar -xvzf nginx-1.13.12.tar.gz
$ unzip v1.13.35.2-stable.zip
```

คราวนี้เราต้องการ PageSpeed Optimization Libraries เพื่อเอาไว้ใช้ compile NGINX ด้วย

```
$ cd ngx_pagespeed-1.13.35.2-stable
$ wget https://dl.google.com/dl/page-speed/psol/1.13.35.2-x64.tar.gz
$ tar -xvzf 1.13.35.2-x64.tar.gz
```

> แค่นี้ก็พร้อมที่จะ compile NGINX แล้ว

เริ่มด้วยกลับไปที่ directory ของ NGINX ที่เคยแตกไฟล์เอาไว้

```
cd ~/nginx-1.13.12
```

แล้วก็ config NGINX ที่เราจะ compile (ข้างล่างนี่คือติดตั้ง Module พื้นฐานทุกอย่างเลย)

```
$ ./configure --add-module=$HOME/ngx_pagespeed-1.13.35.2-stable \
  --with-file-aio --with-ipv6 --with-http_addition_module \
  --with-http_dav_module --with-http_geoip_module \
  --with-http_gzip_static_module --with-http_image_filter_module \
  --with-http_sub_module --with-http_xslt_module --with-mail \
  --with-mail_ssl_module --with-http_ssl_module --with-http_v2_module \
  --with-http_auth_request_module --with-http_flv_module \
  --with-http_gunzip_module --with-http_perl_module --with-http_mp4_module \
  --with-http_secure_link_module --with-http_slice_module \
  --with-http_stub_status_module --with-http_random_index_module \
  --with-http_realip_module --with-stream --with-stream_geoip_module \
  --with-stream_realip_module --with-stream_ssl_module \
  --with-stream_ssl_preread_module --with-google_perftools_module \
  --user=nginx --group=nginx --pid-path=/var/run/nginx.pid
```

เสร็จแล้วก็รอสักพักจนทำงานเสร็จแล้วก็พร้อม compile และติดตั้งได้เลย!

```
$ make && make install
```

หลักจากทำงานเสร็จแล้ว NGINX จะติดตั้งอยู่ที่ `/usr/local/nginx` ซึ่งเราจะทำให้คุณคุ้นเคยกับ NGINX ทั่วไปโดยสร้าง symlink

```
$ ln -s /usr/local/nginx/conf/ /etc/nginx
$ ln -s /usr/local/nginx/sbin/nginx /usr/sbin/nginx
```

คราวนี้เราต้องการสร้าง systemd service ไว้ใช้สั่ง start, stop, restart NGINX เริ่มด้วยเปิดไฟล์ service ขึ้นมา

## Ubuntu

```
$ vi /etc/systemd/system/nginx.service
```

## CentOS

```
$ vi /lib/systemd/system/nginx.service
```

กด `I` เพื่อเข้า Insert Mode แล้วก็เขียนตามนี้

```
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

จากนั้นกด `[Esc]` แล้วพิมพ์ `:wq` เพื่อ save แล้วออกจาก Editor จากนั้นก็ reload สักรอบ

```
$ systemctl daemon-reload
```

แล้วก็เปิด service ขึ้นมาเลย และตั้งให้ start เองเมื่อเปิดเครื่องใหม่ด้วย

```
$ systemctl start nginx
$ systemctl enable nginx
```

## ขั้นตอนที่ 3: ติดตั้ง MySQL


### Ubtuntu

```
$ apt-get install mysql-server
```

เสร็จแล้วก็ตั้งค่า security พื้นฐานตามใจชอบ

```
$ mysql_secure_installation
```

### CentOS

เรื่องของเรื่องคือเราจะไปติดตั้ง MariaDB แทนเพราะอันนี้เป็นเหมือน**รุ่นทดแทน**ของ MySQL แต่ไม่ต้องห่วง! การใช้งานเหมือนกัน

```
$ yum install mariadb-server mariadb
```

จากนั้นก็ start MariaDB ขึ้นมา และเหมือนเดิม...ตั้งให้ start เองเมื่อเปิดเครื่องใหม่

```
$ systemctl start mariadb
$ systemctl enable mariadb
```

เสร็จแล้วก็ตั้งค่า security พื้นฐานตามใจชอบ

```
$ mysql_secure_installation
```

## ขั้นตอนที่ 4: ติดตั้ง PHP

> PHP ที่จะติดตั้งเป็นเวอร์ชั่น 5.X ถ้าอยากได้ PHP 7.X ได้โปรดรออีกสักพักนึงเดี๋ยวจะมีสอนใช้ PHP5 และ PHP7 ในเครื่องเดียวกันด้วย

การที่จะทำให้ PHP ใช้งานกับ NGINX ได้นั้น เราจะติดตั้ง component `php-fpm` เข้าไปด้วย และ `php-mysql` เพื่อไว้ใช้กับ MySQL

### Ubuntu

อันนี้จะติดตั้งผ่าน repository ของ PPA ดังนั้นต้องเพิ่ม repository ก่อน

```
$ add-apt-repository ppa:ondrej/php
```

ถ้าขึ้นเตือนว่า `add-apt-repository: command not found` ให้รันคำสั่งนี้ก่อนแล้วลองเพิ่ม repository ใหม่

```
$ apt-get install software-properties-common
```

แล้วค่อยติดตั้ง

```
$ apt-get install php5.6 php5.6-fpm php5.6-mysql
```

### CentOS

ติดตั้งโดยใช้คำสั่งนี้

```
$ yum install php php-mysql php-fpm
```

## ขั้นตอนที่ 4.5: ตั้งค่า PHP

จากนั้นก็จะไปตั้งค่า PHP

```
$ vi /etc/php.ini
```

หาส่วนตั้งค่าสำหรับ `cgi.fix_pathinfo` โดยพิมพ์ว่า `/cgi.fix_pathinfo` แล้วกด `[ENTER]` จากนั้นก็กด `I` เพื่อเข้า Insert Mode แล้วลบ semicolon ออกและแก้ไขตั้งค่าให้ได้แบบนี้

```
cgi.fix_pathinfo=0
```

จากนั้นกด `[Esc]` แล้วพิมพ์ `:wq` เพื่อ save แล้วออกจาก Editor

จบยัง? ยังไม่จบไปตั้งค่า `php-fpm` ต่อ

```
$ vi /etc/php-fpm.d/www.conf
```

เข้า Insert Mode ได้เลย เดี๋ยวจะแก้ไฟล์เป็นส่วนๆ

อย่างแรกคือ `listen`

```
listen = /var/run/php-fpm/php-fpm.sock
```

จากนั้นก็ลบ comment `listen.owner`, `listen.group` และ `listen.mode` ออกแล้วแก้ไขตามนี้

```
listen.owner = nginx
listen.group = nginx
listen.mode = 0660
```

แล้วก็แก้ `user` และ `group` จาก apache เป็น nginx

```
user = nginx
group = nginx
```

Save แล้วออกจาก Editor ซะแล้วก็จัดการกับ service ก็เป็นอันเสร็จ

```
$ systemctl start php-fpm
$ systemctl enable php-fpm
```

## ขั้นตอนที่ 6: ตั้งค่า NGINX

เอาแบบง่ายๆ พื้นๆก่อนเลยคือจะใช้ NGINX จัดการแค่เว็บเดียวก่อนก็เปิด config มาได้เลย

```
vi /etc/nginx/nginx.conf
```

เข้า Inset Mode แล้วไปดูที่ `server` จากเดิมเป็นประมาณนี้

```
    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

แก้ไขให้เป็นแบบนี้

```
    server {
        listen       80;
        server_name  localhost;

        root   /usr/share/nginx/html;
        index index.php index.html index.htm;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        error_page  404               /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        location ~ \.php$ {
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
        }
    }
```

แล้วก็ Save ออกมา และ restart NGINX รอบนึง

```
$ systemctl restart nginx
```

ใช่...เข้าใจว่า config ของ NGINX มันยุ่งยาก ยิ่งเอา NGINX ไปใช้จัดการหลายๆ domain อีกยิ่งมึน เพราะฉะนั้นรอติดตามภายภาคหน้าต่อกับการจัดการ config NGINX ยังไงให้มีประสิทธิภาพสูงสุด!

## ขั้นตอนที่ 6.5: พิเศษใส่ไข่! สำหรับใครที่ลง PageSpeed Module ไป

เพิ่มข้อมูลพวกนี้ไปใน `server` ด้วยเพื่อเรียกใช้ PageSpeed Module

```
pagespeed On;
pagespeed FileCachePath "/var/cache/ngx_pagespeed/";
pagespeed EnableFilters collapse_whitespace,combine_heads,flatten_css_imports,combine_css,combine_javascript,lazyload_images,resize_rendered_image_dimensions,rewrite_javascript,rewrite_images,rewrite_css;
```

ส่วนของ `EnableFilters` เราจะบอกว่าจะใช้อะไร feature อะไรบ้าง โดยสามารถศึกษาได้[ที่นี่](https://www.ngxpagespeed.com/)

## ขั้นตอนที่ 7: สรุปลวกๆ

- config ของ NGINX อยู่ที่ `/etc/nginx`
- root directory ที่ไว้ใช้แสดงผลเว็บจะอยู่ที่ `/usr/share/nginx` เป็นค่าพื้นฐาน

# เสร็จ!!! พร้อมเล่น