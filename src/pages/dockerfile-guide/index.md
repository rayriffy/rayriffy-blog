---
title: เลือกหา Docker Images ที่ถูกใจไม่ได้? เขียน Dockerfile เองเลยสิ
subtitle: มาสอนสร้าง Dockerfile ครับ ;)
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-05-22T23:24:53.000Z"
featured: false
type: blog
status: published
---

หลังจากที่สอน[วิธีใช้งาน Docker ไป](https://blog.rayriffy.com/docker-beginner-guide)ก็น่าจะได้ลองเล่นกันไปบ้างแล้ว บางทีก็พบว่าพอลองหา Images ที่ต้องการใช้งานใน [Docker Store](https://store.docker.com/) แล้ว...มันแบบ......ไม่ค่อยจะได้เท่าที่ต้องการสักเท่าไหร่ ไม่ก็แบบเรามี script ติดตั้งเองอยู่แล้ว และไม่อยากไปนั่งลงใหม่ทีละ container

ดังนั้นเราก็จะมาสอนเขียน Dockerfile ไว้ใช้ในการสร้าง Images ของตัวเองกัน

## เตรียมเขียน Dockerfile

ไม่คิดอะไรมากก็จะตั้งชื่อไฟล์ว่า `Dockerfile` เก็บไว้ที่ `~/docker/images1`

และ...เพื่อการศึกษาเดี๋ยวก็จะเพิ่มไฟล์ TXT โง่ๆไปด้วย

```
$ cd ~/docker/images1
$ echo 'RIFFYDADDYALLHOME!!!' > text.txt
```

โครงาร้างไฟล์ตอนนี้ก็เป็นประมาณนี้

```
~
└── docker
   └── images1
      ├── Dockerfile
      └── text.txt
```

ไม่มีไฟล์ `Dockerfile` ไม่เป็นไรเพราะเดี๋ยวเราจะเปิดสร้างมาเดี๋ยวนี้แหล่

```
$ cd ~/docker/images1
$ vi Dockerfile
```

## เขียน Dockerfile

การเขียน `Dockerfile` เราจะเขียน **1 Operation ต่อ 1 บรรทัด** โดยเริ่มต้นต้องมี Base Images ก่อนโดยสามารถหาได้จากการ Pull Images ไหนก็ได้ ในที่นี้จะใช้ `centos:7`

```
FROM centos:7
```
 จะเห็นว่าเราจะใช้ `FROM` ในการดึง Images แต่คราวนี้...เราเก๋าพอ จะใช้ `ARG` ในการระบุตัวแปรไว้ใช้ในการ build

```
ARG BASE_VERSION=7
FROM centos:${BASE_VERSION}
```

คราวนี้สิ่งที่จะต้องรู้ด้วยคือถ้าเราระบุ `ARG` ก่อน `FROM` ตัวแปรนี้จะใช้งานอยู่นอก `build stage` ต้องเรียกตัวแปรอีกรอบถึงจะเอาไปใช้งานต่อทีหลังได้

```
ARG BASE_VERSION=7
FROM centos:${BASE_VERSION}
ARG BASE_VERSION
RUN echo $VERSION > baseversion
```

แล้วถ้าจะใส่ Environment Variable? `ENV` สิ

```
ENV RIFFYDADDYALLHOME everytime
```

คราวนี้เราก็จะเอาไฟล์ `text.txt` ที่เคยเพิ่มมาใส่เข้าไปใน Images เราจะใช้คำสั่ง `COPY` เพื่อคัดลอกไปที่ `/root`

```
COPY text.txt /root
```

ตั้ง Permission ได้ด้วยนะแกร อ่ะ! [แปะข้อมูลเพิ่มเติมให้](https://docs.docker.com/engine/reference/builder/#copy)

```
COPY --chown=777 text.txt /root
```

แค่นี้ไฟล์ `text.txt` ของเราก็ไปอยู่ใน `/root` ของ Images แล้ว

คราวนี้ถ้าเราจะรันคำสั่งอะไรขึ้นมาล่ะ ใช้ `RUN` สิ คราวนี้เราก็สามารถใช้ `RUN` ในการสั่งคำสั่งต่างๆได้ เช่น อัพเดตให้เป็นเวอร์ชั่นล่าสุด

```
RUN yum -y update
```

คราวนี้คำสั่งเต็มๆ Docker จะทำคือ `cmd /S /C yum -y update` คิดซะว่าเราอย่ารันคำสั่งอื่นที่ไม่ใช้ `cmd` อ่ะทำไง? ใช้ `SHELL` ไง

```
# Full command `cmd /S /C yum -y update`
RUN yum -y update

# Full command `yum -y update`
SHELL ["yum","-y"]
RUN update

#Full command `cmd /S /C yum -y update`
SHELL ["cmd", "/S", "/C"]
RUN yum -y update
```

เอาจริงๆ แค่ `RUN` ตัวเดียวนี่ก็ครอบคลุมเกือบหมดแล้วนะเนี่ย แต่คราวนี้เราอยากจะเพิ่ม port ให้ Docker เห็นและเอาไปใช้งานข้องนอกได้ล่ะ? `EXPOSE` ช่วยท่านเอง

```
EXPOSE 80
```

คราวนี้ก็กำหนด Work Directory เพื่อกำหนดให้ `RUN`, `CMD`, `ENTRYPOINT`, `COPY` และ `ADD` ให้เริ่มต้นไปที่ Folder นั้น **เตือน!!! ใส่ก่อน RUN, CMD, ENTRYPOINT, COPY, ADD นะจ่ะ**

```
WORKDIR /workspace
RUN pwd
```

คราวนี้เวลารันคำสั่ง `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, `ADD` ก็จะลงไปเริ่มที่ `/workspace`

`ENTRYPOINT` ขออนุญาติไม่สอนเพราะไม่เคยใช้ ;-; [โยน Docs](https://docs.docker.com/engine/reference/builder/#entrypoint)

`LABEL` จะเป็นคำสั่งที่ไว้ใช้สร้าง metadata ให้กับ Images

```
LABEL maintainer="Phumrapee Limpianchop <contact@rayriffy.com>" \
      other="RIFFYLOVE9"
```

คราวนี้เราก็สามารถ Build Images และเอามาใช้ได้แล้ว...แต่เดี๋ยวก่อน! บาง Application ต้องการที่จะต้องรันคำสั่งของตัวเองทุกครั้งที่ start container เราจะใช้ `CMD` ในการจัดการ

```
CMD "yarn serve"
```

ในที่นี้ผมบอกว่าทุกครั้งที่สั่ง `docker start` ให้รันคำสั่ง `yarn serve` แล้วถ้าจะ stop container ให้ถูกต้องแบบสุภาพล่ะ ขอแนะนำให้รู้จักกับ `STOPSIGNAL`

```
STOPSIGNAL SIGTERM
```

เวลาที่สั่ง `docker stop` ก็จะส่ง SIGTERM ให้ Application ใน container ปิดตัวซะ

คราวนี้ก็ลองเอามาประยุกต์ดู หลังจากสร้าง `Dockerfile` เสร็จแลวเราก็จะมา build กัน

```
$ cd ~/docker
$ docker -t riffy:prototype images1
```

คำสั่งนี้จะบอกว่าให้เข้าไปหา `Dockerfile` ที่ `images1/` แล้วพอ build เสร็จให้ตั้งชื่อ Image ว่า `riffy` และใช้ชื่อ tag ว่า `prototype`

## สรุป

น่าจะพอเห็น concept ของ Dockerfile กันบ้างแล้ว แต่ตราวนี้จะพบว่าขนาด Images มันใหญ่มากกกกก ดังนั้นเดี๋ยวรอบหน้าจะมาแจกเคล็ดลับการลดขนาด Images กันครับ รอติดตามกันนะครับ :)