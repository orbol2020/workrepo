const mongoose = require('mongoose');
//always store as string, as "get" requests dont work with numbers. Even if you have a number store  
//a string and then convert it back after querying later on when required. Keep it in mind.
const schemathree = mongoose.Schema(
    
    {
        cinemaName :
        {
            type: String,
            required: [true, "Please enter cinemaName"],
        },

        screenID :
        {
            type: String,
            required: [true, "Please enter screenID"],
        },

        seatingCapacity:
        {
            type: String,
            required: [true, "Please enter seatingCapacity"],
        },

        cost:
        {
            type: String,
            required: [true, "Please enter cost"],
        },
    },
    
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("APIscreenCost", schemathree);