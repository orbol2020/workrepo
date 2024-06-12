const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        state: {
            type: String,
            required: [true, "Please enter State"],
        },
        city: {
            type: String,
            required: [true, "Please enter City"],
        },
        mall: {
            type: String,
            required: [true, "Please enter Mall"],
        },
        mallArea: {
            type: String,
            required: [true, "Please enter Mall Area"],
        },
        pincode: {
            type: String,
            required: [true, "Please enter Pincode"],
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Theatrical", schema);
