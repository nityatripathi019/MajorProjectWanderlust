
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=",
        set: (v) => v === "" ? "https://media.istockphoto.com/id/1453462931/photo/maldives-hotel-beach-resort-on-tropical-island-with-aerial-drone-view.jpg?s=1024x1024&w=is&k=20&c=OWxWTv4Pf0oUwDdhuOrfjcyceotLLlpHqFwmsBjQIyw=" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }]
});

//post middleware

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });

    }

})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;