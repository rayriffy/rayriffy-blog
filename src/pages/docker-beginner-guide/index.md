---
title: มาหัดลองใช้งาน Docker กันเถอะ
subtitle: เข้าใจว่าวางหลายๆ Application ในที่เดียวมันปวดหัว ให้ Docker ช่วยท่านเอง
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-05-16T22:30:00.000Z"
featured: false
type: blog
status: published
---

คุณเคยเจอปัญหานี้หรือไม่ นำแอพพลิเคชั่นขึ้น Production Server มากขึ้นเรื่อยๆ แล้วแอพพลิเคชั่นแต่ละตัวที่มีความต้องการ Environment ที่แตกต่างกันเข้ามาตีกันใน Environment อาจทำให้ Production Server พังถึงขั้นพิการได้ สมัยก่อนเราจัดการแก้ปัญหากันโดยใช้ Hypervisor ในการแยกแอพพลิเคชั่นออกจากกันผ่าน VM (Virtual Machine) แต่ถ้าหากมีอะไรที่ดีกว่านี้? ถ้าหากเราแยก Environment ออกจากกันโดยใช้ OS แค่ตัวเดียว?

> Docker จึงได้ถือจุติขึ้น

## VM vs. Docker

อธิบายให้ง่ายๆได้ว่าการสร้าง VM นั้นจะต้องมีการสร้าง Virtual Hardware ต่างๆไว้ใช้จำลองเช่น vDisk เป็นต้น และจะต้องลง OS ทุกครั้งต่อ 1 VM ซึ่ง...**มันเปลืองพื้นที่**!!! แต่เมื่อเทียบกับ Docker ก็คือแทนที่จะแยก Environment ด้วยการลงทีละ OS เราเปลี่ยนวิธีกลายเป็นว่าลง OS เดียวแต่สามารถแยก Environment หลายๆอันได้ นั่นเองงงงงงงงงงงงง

![VM vs Docker](./vmvsdocker.png)

น่าสนใจชะมะ เรามาลองเล่นเลยดีกว่า

## ติดตั้ง Docker

แน่นอนก่อนจะเริ่มได้ต้องติดตั้งก่อน เอาจริงๆเราสามารถติดตั้งตรงๆแบบ `apt-get install docker` หรือ `yum install docker` ไปเลยก็ได้ แต่คำตอบคือ **ไม่แนะนำ** เพราะที่ติดตั้งไปจะเป็น Docker รุ่นเก่าเรามันปวดหัวดังนั้น แนะนำให้ลง `Docker CE (Community Edition)` ดีกว่า

### Ubuntu 16.04++

อัพเดตก่อน

```
$ apt-get update
```

คราวนี้เราจะติดตั้ง Docker CE ผ่าน repository บน HTTPS ดังนั้นเราจะลง package เพิ่มเติมที่ทำให้ `apt` ติดตั้งได้

```
$ apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

เสร็จแล้วก็เพิ่ม GPG Key ของ Docker

```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
```

คราวนี้ก็สามารถเพิ่ม Repository ได้สักที

```
$ add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

อัพเดต Index สักนิด...

```
$ apt-get update
```
...แล้วติดตั้งเลย!!

```
$ apt-get install docker-ce
```


### CentOS

อัพเดตก่อน

```
$ yum update
```

จากนั้นก็ติดตั้ง package พื้นฐานหลายๆอย่าง

```
$ yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
```

`yum-utils` เราจะไว้ใช้คำสั่ง `yum-config-manager` เพื่อไว้ใช้จัดการ Repository

`device-mapper-persistent-data` และ `lvm2` ไว้ใช้เป็น Storage Driver

มา! ต่ออย่างไวด้วยการเพิ่ม Repository

```
$ yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

และติดตั้งเลย!!!

```
$ yum install docker-ce
```

# ใช้งาน Docker

จะเห็นว่าใส่หัวเรื่องใหญ่กว่าอันอื่นเลย เพราะมันมีเรื่องต้องคุยเยอะ

เดี๋ยวเอาอะไรง่ายๆก่อนละกัน concept ของ Docker จะมีอยู่ 2 อย่างคือ `Images` กับ `Container`

`Images` คิดว่ามันเหมือน snapshot เอาไว้สร้าง `Container` โดยสามารถ build ทำเองได้ หรือไม่ก็หาโหลดมาจาก [Docker Store](https://store.docker.com/)

`Cotainer` เอันเนี่ยเป็นส่วนที่เราจะได้ใช้หลักๆเลย เราจินตนาการว่าคอมพิวเตอร์เราเป็นเรือบรรทุกสินค้า แล้วก็มี container โหลดขึ้นเรื่อมาเรื่อยๆ โดยใน container หนึ่งอันมี Application ของเรา 1 ตัวซึ่งไม่ไปยุ่งกับ container อื่นๆเลย

## Pull images

ก็เรามาเริ่มต้นตั้งแต่ pull image เลยดีกว่าโดยเราจะ pull `nginx:1.13.12` มาล่ะกัน

```
$ docker pull nginx:1.13.12
```

เวลาเราจะ pull images เราจะใช้คำสั่ง `docker pull` เพื่อดึง images ที่ชื่อว่า `nginx` แล้วไอที่อยู่หลัง `:` คืออะไร??

มันคือ *tag* ซึ่งเอาไว้ระบุหาเสป็ค เวอร์ชั่นที่ต้องการสำหรับการทำ Development อย่าง[ถ้าเข้าไปดู nginx ใน Docker Store](https://store.docker.com/images/nginx) จะเห็นว่ามี supported tag อยู่เพียบ นั่นก็คือเราสามารถเรียกใชได้หลายๆเวอร์ชั่นนั่นเอง...

...แต่เดี๋ยวก่อน! มันด่าผมว่า

```
Warning: failed to get default registry endpoint from daemon (Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?). Using system default: https://index.docker.io/v1/
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

อ๋อจะบอกว่าลืมเปิด service 5555555

```
$ systemctl start docker
$ systemctl enable docker
```

หลัง pull เสร็จแล้วอยากดูใช่มั้ยล่ะว่ามี Images อะไรอยู่ในเครื่องบ้าง

```
$ docker images
```
มันก็จะตอบมาว่า

```
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
nginx                1.13.12               ae513a47849c        2 weeks ago         79.6MB
```

เราก็จะได้ข้อมูลทุกอย่างเกี่ยวกับ Images นั้นมา

เราก็สามารถลบ Images ได้ด้วยการใช้คำสั่งตามนี้ (ถ้าลองทำตามอยู่อย่าพึ่งลบนะเพราะจะเอาไปใช้ต่อ)

```
$ docker rmi nginx:1.13.12
```

หรือจะชี้เป็น Image ID ก็ได้

```
$ docker rmi ae513a47849c
```

## จัดการ Container

เดี๋ยวอธิบายคำสั่งเป็นชุดๆเลย

```
$ docker create --name riffydaddyallhome \
                -p 8081:80 -p 1443:443 \
                -e RIFFYPASS=12345677 \
                -v /home/ray:/workspace \
                --restart=always \
                nginx:1.13.12
```

เริ่มสร้าง container ด้วยคำสั่ง `docker create` แล้วก็ใส่ option เสริมนิดหน่อย

`--name` ไว้ใช้ตั้งชื่อ container แนะนำให้ใส่เพราะเวลา `start` `stop` `remove` เราจะเรียกจากมัน โดยในตัวอย่างผมตั้งชื่อ container ว่า `riffydaddyallhome`

`-p` ไว้ใช้ในการ bind port จาก container สู่ host โดยวิธีใส่เลขจะเป็น `portบนคอม:portบนcontainer` อย่างในตัวอย่างจะเป็น `8081:80` แปลว่าให้ bind port 80 จาก container ไปยัง port 8081 ไปยัง host แล้วจะเห็นว่าสามารถ port ได้มากกว่า 1 อัน (`-p 1443:433`)

`-e` เอาไว้ตั้ง Environment Variable บน container ที่จะรันในตัวอย่างก็จะสร้าง Environment Variable ที่ชื่อว่า `RIFFYPASS` และใส่ค่า `12345677` ลงไป (เหมือนกับ `-p` สามารถใส่ได้มากกว่า 1 อันเหมือนกัน)

`-v` ชื่อว่า Volume ซึ่งจำเป็นสำหรับใครที่ทำงาน Project ใหญ่ๆ เพราะ container นั้นถูกจำกัดขนาดไว้ที่ 20GB โดย *default* จะแก้ด้วยการตั้งค่าใหม่ก็ได้ แต่อย่าเลย ดังนั้นเราก็สามารถเชื่อม Folder บน Host ขึ้นไปบน container ได้ทุกที่ๆกำหนดไว้ ซึ่งแปลว่าเวลาเราทำงานบน container แล้วเก็บไฟล์ไว้ที่ตำแหน่งที่เรา volume ไว้มันจะไปเก็บใน Host แทนแต่ก็ยังสามารถเข้าถึงได้ใน container ทำให้ไม่มีปัญหากับพื้นที่จำกัด 20 GB ซึ่งวิธีเชื่อมก็กำหนด `folderของhost:folderของcontainer` ในตัวอย่างจะเห็นว่าผมกรอก `/home/ray:/workspace` ซึ่งก็คือผมเชื่อม `/home/ray` บน host ไปยัง `/workspace` บน container แล้วทุกๆไฟล์ที่อยู่ใน `/home/ray` สามารถเข้าถึงได้โดยไปยัง `/workspace` บน container และในเวลาเดียวกันทุกๆไฟล์ `/workspace` บน container สามารถเข้าถึงได้โดยไปยัง `/home/ray` บน Host นั่นเอง (และ..เหมือนกับ `-p` และ `-e`)

`--restart` ไว้ใช้บอก container ว่ามันควรจะ restart หรือไม่ โดยมี option ให้เลือกอยู่ **4 แบบ** 
 - `no` บอกว่าเมื่อ container exit ตัวเองไม่ต้อง restart
 - `on-failure:<จำนวน restart>` สั่งให้ restart เมื่อ*ไม่ได้* exit ด้วย `code 0` และจำกัดจำนวนการลอง restart ไว้
 - `always` restart ไปแหล่ทุกกรณี ออก `code 0` หรือไม่...ไม่แคร์ค่ะ!
 - `unless-stopped` เหมือนกับ always แต่ต่างที่มันจะไม่ start เองถ้า container อยู่ในสถานะ `STOPPED` ก่อนที่ Docker daemon จะหยุดตัวเอง

คราวนี้ container เราได้ถูกสร้างแล้ว ลองไปดูได้โดยใช้คำสั่ง

```
$ docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS               NAMES
```

แต่เดี๋ยวก่อน! ไม่เห็นมีอะไรเลยหนิ...จะบอกว่า `docker ps` นั้นไว้ใช้ดู container จริง แต่จะเห็นเฉพาะที่เปิดอยู่ ต้องใส่ `-a` เข้าไปด้วย

```
$ docker ps -a
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS                     PORTS               NAMES
160087916fa3        nginx:1.13.12                 "nginx -g 'daemon of…"  3 seconds ago       Created                                        riffydaddyallhome
```

คราวนี้จะสั่ง start มันขึ้นมาล่ะ? ทำไง?... `docker start` ไง! โดยมีอยู่ 2 วิธี
 - จาก container ID
 ```
 $ docker start 4a6296fb34ed
 ```
 - จาก container name
 ```
 $ docker start riffydaddyallhome
 ```
คราวนี้ก็ลองดู container นี้อีกที

```
$ docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                  NAMES
160087916fa3        nginx                        "nginx -g 'daemon of…"   4 seconds ago       Up 3 seconds        0.0.0.0:8081->80/tcp   riffydaddyallhome
```

คราวนี้ลองเปิด Web Browser แล้วเข้าไปดู port ที่ bind ไว้สิ `<HOST-IP>:8081`

ทาดา~ มาแล้ว container แรก ทีนี้เราก็สามารถดู log ของ container นั้นได้ด้วย!?

```
$ docker logs riffydaddyallhome
```

แล้วคราวนี้เราก็จะมาลองเข้าไป execute command ข้างในกันโดยใช้คำสั่ง `docker exec`

```
$ docker exec -ti riffydaddyallhome bash
```

ในที่นี้ผมสั่งให้รันคำสั่ง bash ภายใน container ที่ชื่อว่า `riffydaddyallhome` คราวนี้ผมจะลองสร้างไฟล์ใน `/workspace`

```
# cd /workspace
# echo 'RIFFYDADDYALLHOME!!!' >text.txt
# exit
```

แล้วผมก็ลอง list ไฟล์ใน `/home/ray`

```
$ ls /home/ray
text.txt
```

หน่าาาาาา...แล้วถ้าจะปิดมัน? ลองเดาดู

```
$ docker stop riffydaddyallhome
```

และลบมันออกจากจักรวาล เพียงแค่เคาะ ENTER (ท่ดทีติด Infinity War)

```
$ docker rm riffydaddyallhome
```

## สรุป

ยินดีด้วย! คุณได้พื้นฐานการใช้งาน Docker แล้ววว แต่มันยังไม่หมดหรอกมีพวก `Dockerfile` ไม่ก็ `docker compose` ที่ต้องศึกษาอีกเยอะ เดี๋ยวเอามาสอนต่อ แต่ก็หวังว่าจะได้ความรู้ไม่มากก็น้อย สวัสดีและลาก่อน