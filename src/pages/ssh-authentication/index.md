---
title: เสริมความปลอดภัยให้กับ Server ด้วย SSH Authentication
subtitle: คิดว่าใช้ Password based แล้วปลอดภัยจริงดิ เอาจริง!?
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-12-28T05:00:00.000Z"
featured: false
type: blog
status: published
---

น่าจะเคยมีประสบการณืกันบ้างแหล่ เวลาเข้า SSH ของตัวเองแล้วเจอไรแบบ `You got 1112 failed login attempts since your last login` ถ้าเจอแบบนี้ก็คือมีคนกำลัง Brute Force หารหัสผ่านที่ถูกอยู่ซึ่งจะเจอตอนไหนก็ต้องมานั่งลุ้นกันเอาอีก ดังนั้นเราจะมานำเสนอวิธีการ Login เข้า SSH อีกวิธีนึงที่ปลอดภัยกว่านั่นก็คือ SSH Authentication นั่นเอง

## ขั้นตอนที่ 1: สร้าง Private Key และ Public Key บนคอมตัวเอง

```
$ ssh-keygen -t rsa
```

คราวนี้ตัว ssh-keygen จะถามว่าจะให้เก็บ Private Key ที่ไหน ก็จะตั้งชื่อไฟล์ว่า `id_rsa` เก็บไว้ที่ `~/.ssh`

```
Enter file in which to save the key (/home/demo/.ssh/id_rsa):
```

จากนั้นก็จะให้ตั้งรหัส Passphrase แนะนำให้ทำขั้นตอนนี้เพราะถ้า Private Key โดนขโมยอย่างน้องต้องใส่รหัสก่อนถึงจะใช้งานได้

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

พอเสร็จแล้วจะได้ผลออกมาแบบนี้

```
Your identification has been saved in /home/rayriffy/.ssh/id_rsa.
Your public key has been saved in /home/rayriffy/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:o7VgSJEqd5FU8rZR2++XMlgU0wCBGbxx1yTFBT/GFlY rayri@RIFFY-DELL
The key's randomart image is:
+---[RSA 2048]----+
|   .++..o+oo=B+=E|
|    ++ .=o. .+*..|
|   ...+ .+...  =.|
|. o..o o.  o  o .|
| o .. + S   o    |
|     . + o +   . |
|      . . . + o  |
|             +   |
|                 |
+----[SHA256]-----+
```

พอถึงจุดนี้ก็จะได้ Public Key และ Private Key แล้ว

- Private Key: /home/rayriffy/.ssh/id_rsa
- Public Key: /home/rayriffy/.ssh/id_rsa.pub

## ขั้นตอนที่ 2: เอา Public Key ขึ้น Server

มีให้อยู่ 3 วิธี

### วิธีที่ 1: ใช้ ssh-copy-id

ง่ายมากยิงคำสั่งทีเดียวได้เลย

```
$ ssh-copy-id rayriffy@1.2.3.4
```

**ย้ำ!** ถ้าใช้ macOS อย่าลืมติดตั้งโดยใช้ Homebrew

```
$ brew install ssh-copy-id
```

### วิธีที่ 2: อ่านไฟล์ ก็อป วาง

```
$ cat ~/.ssh/id_rsa.pub | ssh rayriffy@1.2.3.4 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >>  ~/.ssh/authorized_keys"
```
 
## ขั้นตอนที่ 3: ปิดไม่ให้ Server สามารถ Login ด้วยวิธี Password ธรรมดาได้ (แล้วแต่ จะทำหรือไม่ทำก็ได้)

เปิดไฟล์ config ของ SSH

```
$ vim /etc/ssh/sshd_config
```

แก้บรรทัด `PermitRootLogin` ให้เป็น `without-password`

```
PermitRootLogin without-password
```

แล้วก็ Restart Service ซะ

```
$ sudo systemctl reload sshd
```

## ขั้นตอนที่ 4: พร้อมใช้งาน!

ถ้ายังตั้งค่าไม่เป็นอีกก็ตามนี้เลยล่ะกัน

บนคอมเราให้เปิดไฟล์ `.ssh/config`

```
$ vim ~/.ssh/config
```

แล้วใส่ก้อนนี้ลงไป

```
Host 1.2.3.4
  PubkeyAuthentication yes
  IdentityFile ~/.ssh/id_rsa
```

อันนี้แปลว่าให้ใช้ไฟล์ `~/.ssh/id_rsa` เป็น Private Key สำหรับเข้า Server `1.2.3.4` แบบ `PubkeyAuthentication`

แล้วก็ ssh โลด

```
$ ssh rayriffy@1.2.3.4
```

## สรุป

การเปลี่ยนมาใช้ SSH Authtication ทำให้ Server ที่เรารักหวงแหนมีความปลอดภัยมากขึ้น

ก็หวังว่าหลังจากอ่านบทความนี้ จะมีความสุขกับการใช้ SSH Key กันนะครัช ;)