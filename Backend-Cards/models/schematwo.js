const mongoose = require('mongoose');

const schematwo = mongoose.Schema(
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
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Theatrical", schematwo);
