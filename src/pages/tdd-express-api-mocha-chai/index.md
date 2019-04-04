---
title: วิธีการทำ TDD ให้กับ Express REST API ของเราด้วย Mocha และ Chai 
subtitle: แล้วชีวิตการ Development ของคุณจะเปลี่ยนไปตลอดกาล
banner: ./banner.jpg
category: tutorial
author: rayriffy
date: "2019-02-21T08:00:00.000Z"
featured: true
type: blog
status: published
---

ถ้าคุณเขียน Software ในระดับ Production มาบ่อยๆ ก็น่าจะได้รู้จักกับคำว่า TDD (**T**est **D**riven **D**evelopment) กันบ้างแล้ว แต่ถ้าไม่เคยรู้จักมาก่อนเดี๋ยวจะมาอธิบายให้ฟัง

เวลาเราเขียน Software ที่มีขนาดใหญ่ขึ้นเรื่อยๆ การ Maintain โค๊ดให้ใช้งานได้ทั้งหมดก็เริ่มยากขึ้นเรื่อยๆ แล้วเวลาเราเขียนโค๊ดไฟล์นึง เราอาจจะไปทำให้ไฟล์อื่นไม่สามารถใช้งานได้แบบเมื่อก่อนได้ **เราก็จะต้องมาทำการทดสอบมันใหม่ตั้งแต่ต้นเรื่อยๆ** โดย Process นี้ถ้าทำด้วยมือมันจะเป็นขั้นตอนที่ยุ่งยาก และเสียเวลาชีวิตมากๆ ยิ่ง Software ใหญ่ขึ้นเรื่อยๆ ก็ต้องมี Test ที่ใหญ่ขึ้นเรื่อยๆ (อย่างงาน Private เราไปถึง 2000 เทสแล้ว) ก็ถ้าจะทดสอบด้วยมือเองคงไม่น่าไหวมั้ง 555

เราจึงต้องมี TDD เข้ามาช่วยโดยแทนที่เราจะมาทดสอบเอง เราก็ให้ Software มาทดสอบให้เองซะเลย โดยใน Blog วันนี้เราจะพามาทำ TDD ให้กับ REST API ที่เขียนกันใน Express กันนะครับ

ตัวอย่างโค๊ดที่จะเขียนให้ดูอยู่ที่ GitHub นะจ๊ะ [กดตรงนี้เลย](https://github.com/rayriffy/express-mocha-chai-es6)

## ขั้นตอนที่ 1: ติดตั้ง Mocha และ Chai

ก็เพิ่มพวกนี้เข้าไปเป็น Development Dependencies ได้เลย

```
yarn add mocha chai chai-http --dev
```

## ขั้นตอนที่ 2: อย่าลืม module.exports server ตัวเอง

คือเราใช้ *mocha* เป็นตัวทดสอบ แต่เราเอา *chai* *chai-http* มาทดสอบกับ REST API ของเรา แต่ *chai* จะหา Express server ไม่เจอเลยถ้าเราไม่ `export` เอาไว้ เพราะฉะงั้นก็อย่าลืม export กันด้วย

ใน **ES6** จะเป็น `export default` ตามตัวอย่างข้างล่างเลย

`gist:rayriffy/5ba8d32a2cc8fe7de6793a5c373e1487`

## ขั้นตอนที่ 3: เขียนตัว Test กันเลย

ไฟล์นี่จะเขียนอยู่ใน `/test` นะ เดี๋ยวมาอธิบายโค๊ดให้ฟัง

`gist:rayriffy/0ae1d58797ffa1389a5537cc023a9c44`

```
const server = require('../build/main').default
```

เวลาเรา Build server มาจาก ES6 จะได้ไฟล์อยู่ที่ `build/main.js` เราก็ import ตัวนั้นมาไว้ในตัวแปร `server`

ย้ำตรงนี้เลยว่าถ้าเขียน JS ปกติใช้ `module.exports` แค่ `require('../build/main')` ก็พอ แต่นี่เราคือใช้ ES6 มัน export ไว้ที่ default ก็เลยต้อง `.default` ตามเข้าไปด้วย

```
chai.use(chaiHttp)
chai.should()
```

ส่วนนี้เราจะเอามา Intitialize *chai* ให้มันทำงาน

```javascript
describe('Testing unit 1', () => {
  // Code...
})
```

ตัว `describe()` เราเอาไว้รวบหลายๆ Test ไว้เป็นกลุ่ม ก็สามารถรวมเป็นกลุ่มซ้อนกันได้กี่ชั้นก็ได้

```javascript
before(done => {
  // Do something here before test
  done()
})
```

บางกรณีก่อนที่เราจะทำอะไรสักอย่างก่อนที่จะเริ่ม Test เช่น แก้ไขข้อมูลบางส่วนบน Database เราก็สามารถทำที่ `before()` ได้แล้วก็ใช้ `done()` ในการจบด้วยนะ เดี๋ยวค้างไม่ออก

มันก็ไม่ได้มีแค่นี้หรอกมันจะมี

-   `after()` ที่รันตอนสุดท้าย
-   `beforeEach()` จะรันทุกครั้งก่อนที่จะเริ่มทุก Test
-   `afterEach()` จะรันทุกครั้งหลัง Test เสร็จ

```javascript
it('it should have message OK', done => {
  // Code...
})
```

ตัว Test case จริงเราจะทำกันใน `it()` แล้วก็ใช้ `done()` ในการจบเช่นกัน

```javascript
chai
  .request(server)
  .get('/')
  .end((e, res) => {
    res.should.have.status(200)
    res.body.should.have.property('message').eql('OK')
    done()
  })
```

คราวนี้ได้ใช้งาน *chai* จริงๆล่ะ

เราก็เริ่มจากดึง Server มาโดยใช้ `.request(server)`

แล้วก็เรียก path ว่าจะเรียก path ไหน method อะไร `.get('/')`

แล้วบางกรณีสำหรับ POST อะพวกนี้อาจจะต้องส่ง payload หรือตั้ง header ก็สามารถใช้ `.set()`, `.send()` ได้ตามตัวอย่าง

จากนั้นก็เรียก request โดยใช้ `.end()` แล้วก็เอาของข้างในมาเช็คต่อ ในตัวอย่างก็จะเป็น

-   ดูว่าส่ง HTTP Status มาเป็น 200 หรือไม่ (`res.should.have.status(200)`)
-   ส่วน response ที่ออกมามี message ว่า OK หรือไม่ (`res.body.should.have.property('message').eql('OK')`)

ถ้าไม่ผ่านก็จะ fail ไปแต่ถ้าผ่านทุกกรณีก็จะให้ผ่าน `done()` ออกไปนั่นเอง

## ขั้นตอนที่ 4: Test แม่ม

เราแนะนำให้แนบคำสั่งไว้ใน script บน `package.json` ดีกว่านะ

`gist:rayriffy/c37f6e71ec9f4f9a14d01b72fc370779`

```
yarn test
```

แล้ว mocha ก็จะรันเช็คทดสอบทุกอย่างให้ตามภาพด้านล่างเลย

```
  Testing unit 1
    GET /
      √ it should have message OK (52ms)


  1 passing (80ms)
```

แล้วถ้าเราใช้ Git กันอยู่แล้วก็สามารถให้ **Travis CI** ทดสอบให้ด้วยก็ยังได้...ง่าย และสบายไปอีกขั้น

`gist:rayriffy/7cd2c080f5591534f9061608340bfdb0`

## สรุป

เท่านี้ก็ได้ Basic แล้ว ที่เหลือคือก็มาคิดดูว่าเราจะเอาของพวกนี้ไปใช้กันยังไงแล้ว ส่วนข้อมูลเพิ่มเติมต่างๆเดี๋ยวจะแปะเอาไว้ให้ด้านล่าง แล้วเดี๋ยวต่อไปเราจะมาสอบใช้งาน Puppeteer กัน แล้วเจอกันครับ :)

## Reference

-   [Mocha](https://mochajs.org/)
-   [Mocha Guide to Testing](https://gist.github.com/samwize/8877226)
-   [Chai](https://www.chaijs.com/)
-   [Chai HTTP](https://www.chaijs.com/plugins/chai-http/)
