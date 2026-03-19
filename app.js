if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");

const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const userRouter = require("./routes/user");

const app = express();
const isProduction = process.env.NODE_ENV === "production";

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is required");
}


// ================= CONFIG =================

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// ================= DATABASE =================

const dbUrl = process.env.ATLASDB_LINK;

async function main() {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});


// ================= SESSION STORE =================

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});


// ================= SESSION CONFIG =================
app.set("trust proxy", 1);

const sessionOptions = {
    store,
    name: "wanderlust.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    },
};

app.use(session(sessionOptions));
app.use(flash());


// ================= PASSPORT =================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================= GLOBAL VARIABLES =================

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// ================= ROUTES =================

// ROOT
app.get("/", (req, res) => {
    res.render("listings/root");
});

// ROUTERS
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


// ================= 404 HANDLER =================

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// ================= ERROR HANDLER =================

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error", { err });
});


// ================= SERVER =================

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});