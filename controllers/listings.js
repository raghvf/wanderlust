const { response } = require('express');
const Listing = require('../models/listing');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAPBOX_API_KEY;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


// Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// Render form to create a new listing
module.exports.renderNewform = (req, res) => {
    res.render("listings/new");
};

// Create a new listing
module.exports.createListing = async (req, res) => {

    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    let url = req.file.path;
    let filename = req.file.filename;

    const data = req.body.listing;

    // Use default image if none provided
    if (!data.image || !data.image.url || data.image.url.trim() === "") {
        data.image = {
            filename: "",
            url: "/images/default.jpg"
        };
    }

    const newListing = new Listing(data);

    // owner
    newListing.owner = req.user._id;

    // image
    newListing.image = { url, filename };

    // FIXED LINE
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    // console.log(savedListing);

    req.flash("success", "New listing created");
    res.redirect("/listings");
};

// Render edit form
module.exports.editListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    let originalImage = listing.image.url;

    originalImage = originalImage.replace("/upload", "/upload/h_300,w_250");

    res.render("listings/edit", { listing, originalImage });

};

// Update listing
module.exports.updateListing = async (req, res) => {

    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { $set: req.body.listing },
        { runValidators: true, new: true }
    );

    if (req.file) {

        const url = req.file.path;
        const filename = req.file.filename;

        listing.image = { url, filename };

        await listing.save();
    }

    req.flash("success", "Listing updated successfully");

    res.redirect(`/listings/${id}`);
};

// Show single listing with reviews and owner
module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");

    res.render("listings/show", { listing });
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
};