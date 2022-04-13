const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let mentorVideo = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "Users" },
        videoList: [
            {
                sequence: { type: Number },
                scriptGroup: { type: Number },
                question: { type: String, trim: true },
                answer: { type: String, trim: true },
                videoLink: { type: String, trim: true },
                videoOldLink: { type: String, trim: true },
                dolbyJobId: { type: String, trim: true },
                dolbyApiKey: { type: String, trim: true },
                isDolbyProcessed: { type: Boolean },
                originalVideoLink: { type: String, trim: true },
                thumbnail: { type: String, trim: true },
                watermarkVideo: { type: String, trim: true },
                tag: { type: String, trim: true },
                status: { type: Boolean }, //- for future approval
                uploaded: {
                    type: String,
                    enum: ["initial", "loading", "success", "failed"],
                    default: "initial",
                },
                duration: {
                    type: Number,
                },
                isEnhanced: {
                    type: Boolean,
                },
            },
        ],
        experienceType: {
            type: Number,
            enum: [1, 2],
            //enum: ["professional", "education"] //type 2-edu
        }, //- type of video
        experienceTypeId: { type: Schema.Types.ObjectId }, //object id of professional/education   (typeid)
        isApproved: { type: Number }, // {1- requested, 2- rejected, 3-approved, 0- pending}
        //- added to replicate the data for reels /* update while making expert live */
        profileTypeId: { type: Schema.Types.ObjectId, ref: "ProfileType" },
        profileTypeName: { type: String, trim: true },
        companyId: { type: Schema.Types.ObjectId, ref: "Companies" }, //- filter index
        companyName: { type: String, trim: true },
        designationId: { type: Schema.Types.ObjectId, ref: "Designation" }, //- filter index
        designationName: { type: String, trim: true }, //- filter index
        sectorId: { type: Schema.Types.ObjectId, ref: "Sector" }, //- filter index
        sectorName: { type: String, trim: true }, //- filter index
        collegeId: { type: Schema.Types.ObjectId, ref: "College" }, //- filter index
        collegeName: { type: String, trim: true }, //- filter index
        programId: { type: Schema.Types.ObjectId, ref: "Program" }, //- filter index  (degree field in frontend)
        programName: { type: String, trim: true }, //- filter index  (degree field in frontend)
        departmentId: { type: Schema.Types.ObjectId, ref: "Department" }, //- filter index
        departmentName: { type: String, trim: true },
        //- to add to show data on the basis of views
        experienceViews: {
            type: Number,
            default: 0,
        },
        experienceShared: {
            type: Number,
            default: 0,
        },
        experienceLiked: {
            type: Number,
            default: 0,
        },
        buildNumber: { type: Number },
        noOfInteraction: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
mentorVideo.index({
    experienceTypeId: 1,
    userId: 1,
    companyId: 1,
    designationId: 1,
    sectorId: 1,
    departmentId: 1,
    collegeId: 1,
    programId: 1,
    profileTypeId: 1,
});

mentorVideo.virtual("educationalExperience", {
    ref: "Education",
    localField: "experienceTypeId",
    foreignField: "_id",
    justOne: true,
    // match: { experienceType: 2 }
});

mentorVideo.virtual("professionalExperience", {
    ref: "Professional",
    localField: "experienceTypeId",
    foreignField: "_id",
    justOne: true,
    // match: { experienceType: 1 }
});
module.exports = mentorVideo

// module.exports = mongoose.model("InteractionLiveVideo", mentorVideo);
