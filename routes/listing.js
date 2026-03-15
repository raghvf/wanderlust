const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");

const { isLoggedIn, isOwner, validateListing } = require('../middleware');

const listingController = require('../controllers/listings');
const multer = require('multer');

const {storage} = require('../cloudconfig');


const upload = multer({storage})


// INDEX + CREATE
router.route("/")
.get(wrapAsync(listingController.index))
.post(
isLoggedIn,
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.createListing)
);


// NEW FORM
router.get("/new", isLoggedIn, listingController.renderNewform);


// SHOW UPDATE DELETE
router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
)

.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
);


// EDIT FORM
router.get(
"/:id/edit",
isLoggedIn,
isOwner,
wrapAsync(listingController.editListing)
);


module.exports = router;