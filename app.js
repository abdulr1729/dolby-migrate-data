require("dotenv").config();
const { preProd, prod } = require("./db/connection");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const _ = require("lodash");



async function a() {

  let resultPrePRod = await preProd.collection('mentorvideolives').find({
    videoList: {
      $elemMatch: {
        isDolbyProcessed: true,
        isEnhanced: { $ne: true }
      },
    },
  }).limit(1).toArray()

  resultPrePRod.map(async mentorPreProd => {

    let mentorProd = await prod.collection('mentorvideolives').findOne({
      userId: mentorPreProd.userId
    })
    console.log(mentorProd.userId)
    let mergedVideoList = mentorProd.videoList.map(obj => mentorPreProd.videoList.find(o => o.id === obj.id) || obj);
    await mergedVideoList.map(async video => {
      video.isEnhanced = true
      return video
    })

    // console.log(mergedVideoList, mergedVideoList.length)
    // mentorProd.videoList = mergedVideoList
    // console.log(mentorProd.videoList)
    // await prod.collection('mentorvideolives').save(mentorProd)


    let resp = await prod.collection('mentorvideolives').updateOne({
      "userId": mentorPreProd.userId
    }, { $set: { videoList: mergedVideoList } }, { upsert: true });
    console.log(resp)

  })
}
setTimeout(() => { a() }, 2000)