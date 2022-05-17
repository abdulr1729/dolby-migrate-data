require("dotenv").config();
const { preProd, prod } = require("./db/connection");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const _ = require("lodash");



async function a() {
  try {

    let resultPrePRod = await preProd.collection('mentorvideolives').find({
      videoList: {
        $elemMatch: {
          isDolbyProcessed: true,
          isEnhanced: { $ne: true }
        },
      },
    })
      // .limit(5)
      .toArray()

    resultPrePRod.map(async mentorPreProd => {
      try {
        let mentorProd = await prod.collection('mentorvideolives').findOne({
          userId: mentorPreProd.userId
        })
        // console.log(mentorProd.userId)
        // console.log(mentorPreProd.videoList)

        let mergedVideoList = mentorProd.videoList.map(obj => mentorPreProd.videoList.find(o => o._id.toString() === obj._id.toString()) || obj);
        await mergedVideoList.map(async video => {
          video.isEnhanced = true
          return video
        })
        // console.log(mentorProd.videoList.length)
        // console.log(mentorPreProd.videoList.length)
        // console.log(mergedVideoList)

        // console.log(mergedVideoList, mergedVideoList.length)
        // mentorProd.videoList = mergedVideoList
        // console.log(mentorProd.videoList)
        // await prod.collection('mentorvideolives').save(mentorProd)


        let resp = await prod.collection('mentorvideolives').updateOne({
          "userId": mentorPreProd.userId
        }, { $set: { videoList: mergedVideoList } }, { upsert: true });
        console.log(resp)
      } catch (error) {
        console.log("error in map:", error)
      }


    })

  } catch (error) {
    console.log(error)
  }

}
setTimeout(() => { a() }, 2000)