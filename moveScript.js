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
    }).toArray()
    resultPrePRod.map(async mentorPreProd => {
        console.log(mentorPreProd._id)


        let resp = await prod.collection('mentorvideolives').updateOne({
            "userId": mentorPreProd.userId
        }, { $set: { videoList: mentorPreProd.videoList } }, { upsert: true });
        //  console.log(resp)
        //  console.log("after save ",mentorProd)

    })
}
setTimeout(() => { a() }, 2000)