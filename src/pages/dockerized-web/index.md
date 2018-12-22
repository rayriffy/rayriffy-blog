---
title: มาทำเว็บยุ่งๆ ให้สวยงามด้วย Docker กันครับ
subtitle: Standalone ---> Dockerized
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-09-20T02:00:00.000Z"
featured: false
type: blog
status: published
---

สวัสดีครับทุกคน วันนี้จะมาเล่าประสบการณ์การ renovate เว็บ rayriffy.com จากเดิมที่เป็น standalone กลายมาเป็น Docker กันนะครับ

## ตอนที่ 1: ออกแบบโครงสร้างของระบบ

ระบบที่วางเอาไว้คือ จะให้ Traffic ทั้งหมดไปที่ container ที่ชื่อว่า `proxy` โดย `proxy` จะเป็นตัวกลางสื่อสารระหว่าง Network ภายนอกกับ Network ภายใน

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Frayriffy%2Fposts%2F942521585935258&width=500" width="100%" height="400px" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>

ส่วนด้านในก็จะเป็นเว็บต่างๆ โดยจัดไว้แบบหนึ่งเว็บต่อ container แล้วก็มีของจุกจิกอื่นๆนิดหน่อยเช่น `php-fpm` คือ...ต้องเข้าใจนะว่าผมสาย Laravel ผสม Vue.js ซึ่ง Laravel มันก็ต้องใช้ `php-fpm` เหมือนกัน แล้วทั้งหมดนี้ก็จะอยู่ใน backend Network ที่ไม่สามารถเข้าถึงได้โดยตรงจากภายนอก

จากตรงนี้ง่ายๆเลยคือมีแค่ `proxy` เท่านั้นที่ออกคุยกับโลกภายนอกได้

## ตอนที่ 2: เตรียมตัวก่อนเริ่มงาน

โปรเจคสุด Masterpiece นี้สามารถหาดูได้บน [GitHub](https://github.com/rayriffy/rayriffy-com) นะครับ จุ๊บๆ

แน่นอนว่าเราต้องลง **Docker CE** และ **Docker Compose** ให้เรียบร้อยก่อน โดยจะแปะ tutorial ไว้ให้

  - [ติดตั้ง Docker CE สำหรับ CentOS](https://docs.docker.com/install/linux/docker-ce/centos)
  - [ติดตั้ง Docker CE สำหรับ Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu)
  - [ติดตั้ง Docker Compose](https://docs.docker.com/compose/install)

หลังลงเสร็จแล้วก็มาต่อกันได้เลย ไฟล์หลักที่เราจะทำงานกันคือ `docker-compose.yml` โดยเริ่มต้นเราก็จะมาสร้าง Network ให้กับระบบเราก่อน ซึ่งจะมีอยู่ 2 อันคือ *frontend* กับ *backend*

`gist:rayriffy/041e2cd532eee743fee5388c01a3a77d`

## ตอนที่ 3: เริ่มสร้าง proxy อันน่ารักของเรากัน~

อย่างแรกก่อนที่จะมี proxy เลยคือเราต้องมี SSL Certificate ก่อน โดยผมก็ไปหา Images ที่สามารถสร้าง SSL ด้วย Let's Encrypt ได้ แถมทำให้เองได้กับ Cloudflare API ด้วย!? เลยจัดซะเลย

`gist:rayriffy/b3214819051a96085c820d7fdb22dda6`

จาก config ผมได้ volume folder ของ `/etc/letsencrypt` ไปใส่ที่ `./tmp/letsencrypt` อันนี้จะเอาไว้ให้ proxy เรียก SSL certificate มาใช้ และคราวนี้ก็จะสังเกตุเห็นว่าผมมีการอ้างอิงไฟล์ 2 ตัวคือ `env` กับ `domains.conf` โดยมันจะมีเหตุผลของมันอยู่

`env` จะเป็น Environment Variables ที่เอาไว้ใช้ Build โดยหลักๆที่ตั้งคือ Email และรายละเอียดของ Cloudflare

`gist:rayriffy/47b0620ebffd5c36052bde3692949fe7`

`domains.conf` จะเป็นไฟล์ที่บอกว่าจะให้สร้าง SSL ของโดเมนไหนบ้าง โดยผมตั้งให้ทำ Wildcard SSL ให้กับ rayriffy.com และทุก subdomain ของ rayriffy.com

`gist:rayriffy/164ef7d4147a0bac4fad88d6c534e3f2`

คราวนี้ก็ต่อด้วย proxy โดยผมเลือกที่จะใช้ NGINX เป็น Web Server

`gist:rayriffy/a8e83063ddefc0a65bd17ed798862555`

คราวนี้ใน volumes ก็จะมีพวกไฟล์ config ของแต่ละ domain อยู่ที่ `./nginx/conf/web` โดยตัวอย่างง่ายๆจะประมาณนี้

`gist:rayriffy/23c4890930bf31dade8ec76ca88de564`

config ตัวนี้จะบังคับให้ redirect ทุก HTTP Request ไป HTTPS แล้วส่ง proxy ไปที่ `http://web-blog-rayriffy-com` โดย *web-blog-rayriffy-com* จะเป็นชื่อ container ที่จะ deploy ต่อค่อยเอาไว้มาอธิบาย แต่ concept คือไม่จำเป็นต้องกำหนด IP เพราะ Docker จะจัดการ DNS ทุกอย่างไว้ให้แล้วตามชื่อ container ขอแค่ให้เชื่ออยู่ใน Network เดียวกันก็พอ

ส่วนตั้งค่า SSL จะตั้งยังไงก็ตั้งกันเองเลยเต็มที่

อ่อลืมอธิบายเรื่องเกี่ยวกับ `depends_on`

## ตอนที่ 4: ลงเว็บ (ของจริงล่ะๆ)

มาลงเว็บกันเลย เริ่มตั้งแต่ `docker-compose.yml`

`gist:rayriffy/0ae76a82f029113ddfbd352804e21f97`

services ที่มาเพิ่มจะมีอยู่ 2 อันคือ เว็บอันนึง และ PHP-FPM อีกอันนึง ซึ่ง [PHP-FPM เรา build เอาเองสดๆ ไปดู Dockerfile เอาเอง](https://github.com/rayriffy/rayriffy-com/tree/master/php-fpm/build/72) จะไม่อธิบาย แต่ง่ายๆคือ php-fpm จะฟังอยู่ที่ port 9000 **และอย่าลืม volume เว็บให้ path เหมือนกับ container เว็บด้วย**

ส่วนตัวเว็บเราก็ Build เองสดๆเหมือนกัน โดยมีโครงสร้างแบบนี้

`gist:rayriffy/f9a7564f0c7bfd4cdd7cf7b3aa23ba1f`

เรารับ environment `SERVER_NAME` `ROOT` `PHP_BACKEND` จาก `docker-compose.yml` เพื่อเอามาวางในไฟล์ `site-template.conf` ข้อดีของการทำแบบนี้คือภายใน Dockerfile ตัวเดียว จะสามารถใช้กับ domain อื่นๆได้อีก ไม่จำเป็นต้องเขียนทีละอัน

เราก็ volume data เว็บทั้งหมดแล้วกำหนด `ROOT` ให้ถูก ตั้ง `SERVER_NAME` ให้ดี แล้วก็บอก `PHP_BACKEND` ที่ต้องการให้ fast_cgi ใช้

## ตอนที่ 5: ลองรันมันดู

คำสั่งเดียวง่ายๆ

```markdown
$ docker-compose up
```

แค่นี้ก็ได้ [blog.rayriffy.com](https://blog.rayriffy.com) แล้วแบบง่ายๆ 

## สรุป

คราวนี้ก็จะได้มาแล้ว 1 domain ที่เหลือแค่ทำแบบเดิมคล้ายๆกันไปเรื่อยๆจนเสร็จตามที่ต้องการ :) ถ้าต้องการดูอะไรที่ละเอียดกว่านี้ก็ลองไปดู [GitHub](https://github.com/rayriffy/rayriffy-com) ผมแล้วขุดๆคุ้ยๆดู หวังว่าจะได้ concept การทำเว็บแบบ Dockerized ของผมกันนะครับ

ว่างๆก็ลองเอาไป Implement กับเว็บของคุณเองได้นะครับ ขอบคุณครับ