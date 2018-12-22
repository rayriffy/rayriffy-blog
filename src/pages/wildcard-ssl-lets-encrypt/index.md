---
title: ใบเดียวก็เอาอยู่! มาสร้าง Wildcard Certificate SSL ด้วย Let's Encrypt กัน!
subtitle: จะสร้างใบ SSL 1 ใบต่อ subdomain ทำไม...ใบเดียวใช้ทั้งวงเฟี้ยวกว่า
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2018-04-27T07:06:52.284Z"
featured: false
type: blog
status: published
---

[Let's Encrypt](https://letsencrypt.org/) เป็นหนึ่งในบริการที่สามารถสร้างใบรับรองความปลอดภัย SSL ได้ฟรี และในไม่กี่เดือนที่ผ่านมานี้ทาง Let's Encrypt ก็ได้ให้บริการสร้างใบรับรอง SSL แบบ Wildcard Certificate ทำให้ผู้ใช้งานไม่จำเป็นที่จะต้องมานั่งสร้างใบ SSL 1 ใบต่อ 1 sub-domain แต่สามารถที่จะใช้ Wildcard Certificate สร้างใบ SSL มาเพียงแค่ใบเดียว แต่ก็ใช้งานกับวง sub-domain  ทั้งหมดได้ โดยในบทความนี้จะมาสอนทุกคนสร้างใบรับรอง Wildcard Certificate SSL กันด้วย Let's Encrypt นะครับ

## ทำไมต้องใช้ SSL ด้วยล่ะ?
จินตนาการ (มโน) ว่าการสื่อสารระหว่างผู้ใช้กับเครื่องเซิร์ฟเวอร์เราสื่อสารผ่านท่อนึงที่ใช้ทำหน้าที่ส่งข้อมูล และสื่อสารกัน เมื่อแต่ก่อนเราใช้ **HTTP Protocol** ในการส่งข้อมูล แต่ Protocol ดังกล่าวสามารถมีผู้ดักฟัง (man-in-middle) สามารถที่จะดักจับข้อมูลและดูข้อมูลต่างๆที่เราส่งขึ้นไปได้ เช่น รหัสผ่าน ไฟล์อัพโหลด หรือแม้จะเป็นข้อมูลที่ส่งผลกระทบในระดับองค์กร
> ดังนั้น HTTPS Protocol จึงได้กำเนิดขึ้นนนนนนนน

HTTPS Protocol ได้นำไปใช้งานในปี 2003 โดยประกาศไว้ใน [RFC 2818](https://tools.ietf.org/html/rfc2818) ซึ่งช่องทางติดต่อสื่อสารที่เป็นท่อนั้นจะถูกเข้ารหัสทำให้ผู้ดักฟังไม่สามารถรับรู้ได้เลยว่าข้อมูลนี้คืออะไร เพราะถูกเข้ารหัสเอาไว้ ทำให้การใช้งานอินเตอร์เน็ตปลอดภัยขึ้น

## สำหรับ Web Administrator ต้องแคร์ด้วย?
ตบให้หลังหลายเลยหนิ สำคัญมาก!!! เพราะมันคือการดูแลความปลอดภัยของลูกค้า และภายภาคหน้า Google Chrome 68 จะเริ่มเอาจริงกับเว็บที่ยังใช้ HTTP แล้ว โดยจากเดิมแค่เตือนเป็น icon เฉยๆ รอบนี้ *Not Secure* ตัวบะเริ่มเลยครับ [หาอ่านได้ที่นี่](https://blog.chromium.org/2018/02/a-secure-web-is-here-to-stay.html)
![Chrome68](./chrome68.png)

## งั้นมาเริ่มเลยดีกว่า
อย่างแรกที่ต้องใช้เลยคือ `certbot` ซึ้งจะเป็นตัวช่วยในการสร้างใบ SSL จาก Let's Encrypt โดยสามารถ[หาวิธีติดตั้งตามเสปคของตัวเองได้ที่นี่](https://certbot.eff.org/) โดยในกรณีของผมจะยกตัวอย่างว่าผมใช้ **NGINX** บนระบบปฏิบัติการ **CentOS 7**

```
$ sudo yum install -y certbot-nginx`
```

จากนั้นก็เริ่มขั้นตอนการสร้าง Wildcard Certificate ได้เลย โดยผมต้องการที่จะสร้างแค่ใบ Certificate อย่างเดียวสำหรับ `rayriffy.com` และ subdomain ทั้งหมดของ `rayriffy.com`

```
$ sudo certbot certonly \
  --server https://acme-v02.api.letsencrypt.org/directory \
  --manual --preferred-challenges dns \
  -d *.rayriffy.com -d rayriffy.com
```

จะสังเกตเห็นว่าผมใส่ domain ไป 2 ตัวคือ `*.rayriffy.com`,`rayriffy.com` เพราะ `*.rayriffy.com` จะครอบคลุมแค่ subdomain ไม่รวม domain หลัก **และที่สำคัญ** เราจะเรียกใช้ Let's Encrypt API V2 จาก `https://acme-v02.api.letsencrypt.org/directory`

หลังจากนั้นระบบก็จะตอบกลับมา

```
-------------------------------------------------------------------------------
Please deploy a DNS TXT record under the name
_acme-challenge.rayriffy.com with the following value:
 
HeT72WCsdAHiH87eOz4-#######################
 
Before continuing, verify the record is deployed.
-------------------------------------------------------------------------------
Press Enter to Continue
```

คราวนี้เราก็จะวิ่งไปจัดการ DNS ของเราโดยเพิ่ม **TXT Record** ชื่อว่า `_acme-challenge.rayriffy.com` แล้วใส่ค่า `HeT72WCsdAHiH87eOz4-#######################` ตามที่ได้มาลงไป

เสร็จแล้วเราไปยืนยันก่อนว่า DNS ที่เพิ่มไปขึ้นแล้ว

```
$ nslookup -type=TXT _acme-challenge.rayriffy.com
  Server:         203.146.XXX.XXX
  Address:        203.146.XXX.XXX#53

  Non-authoritative answer:
  _acme-challenge.rayriffy.com    text = "HeT72WCsdAHiH87eOz4-#######################"

  Authoritative answers can be found from:
  rayriffy.com    nameserver = ns1.riffyauth.com.
  rayriffy.com    nameserver = ns2.riffyauth.com.
  ns2.riffyauth.com internet address = XXX.XXX.XXX.XXX
```

หรือไม่ก็ไปหาโดยใช้ [G Suite Toolbox](https://toolbox.googleapps.com/apps/dig/#TXT/) ก็ได้

โอเค ตอนนี้เรารู้ล่ะว่ามันขึ้นมาแล้ว เราก็กดปุ่ม **ENTER** แล้วทำงานกันต่อเลย พอเสร็จแล้วระบบก็จะตอบกลับมา

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/rayriffy.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/rayriffy.com/privkey.pem
   Your cert will expire on 2018-06-12. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again. To non-interactively renew *all* of your certificates, run
   "certbot-auto renew"
 - If you like Certbot, please consider supporting our work by:
 
   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

ยินดีด้วย! คุณได้ Wildcard Certificate พร้อมเอาไปใช้งานจริงแล้ว! โดยจะมีอยู่ 2 ไฟล์ ได้แก่ 
`/etc/letsencrypt/live/rayriffy.com/fullchain.pem` กับ `/etc/letsencrypt/live/rayriffy.com/privkey.pem`

อ่อ แล้วเห็น Let's Encrypt ออกของดีแบบนี้มาให้ใช้ก็อย่าลืมไป [Donate](https://letsencrypt.org/donate/) หาข้าวให้เค้ากินด้วย 55555