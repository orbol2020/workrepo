const mongoose = require('mongoose');

const schemathree = mongoose.Schema(
    
    {
        cinemaName :
        {
            type: String,
            required: [true, "Please enter cinemaName"],
        },

        screenID :
        {
            type: Number,
            required: [true, "Please enter screenID"],
        },

        seatingCapacity:
        {
            type: Number,
            required: [true, "Please enter seatingCapacity"],
        },

        cost:
        {
            type: Number,
            required: [false, "Please enter cost"],
        },
    },
    
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("APIscreenCost", schemathree);