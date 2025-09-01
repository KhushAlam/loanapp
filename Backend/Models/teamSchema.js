import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,

    },
    discription: {
        type: String,
        required: true,
    },
    pic: {
        type:String,
        required:true,
    }

})

const Team = mongoose.model("Team", teamSchema);
export default Team;