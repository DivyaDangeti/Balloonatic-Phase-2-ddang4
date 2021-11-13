const createError = require('http-errors');
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const bodyParser = require("body-parser"); // middleware
const { body } = require("express-validator");
const { checkLogin, registerUser } = require("./controllers/authCtrl");
global.universal = require("./data/balloonatic-phase2");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// use res.render to load up an ejs view file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    session({
        secret: "123456cat",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    })
);
app.use(flash());
app.use(function(req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});
// index page
app.get("/", function(req, res) {
    // get three random products
    const n = 3
    res.render("pages/index", {
        user: req.session.user,
        products: global.universal.products.map(x => ({ x, r: Math.random() }))
            .sort((a, b) => a.r - b.r)
            .map(a => a.x)
            .slice(0, n)
    });
});

// about page
app.get("/quote", function(req, res) {
    const items = global.universal.quotes
    res.status(200).send({
        quote: items[Math.floor(Math.random() * items.length)]
    })
});
// about page
app.get("/about", function(req, res) {
    res.render("pages/about", { user: req.session.user });
});
// contact page
app.get("/contact", function(req, res) {
    res.render("pages/contact", { user: req.session.user });
});
// product page
app.get("/product", function(req, res) {
    res.render("pages/product", { user: req.session.user });
});
//login page
app.get("/login", function(req, res, next) {
    res.render("pages/login-form");
});
//register page
app.get("/register", function(req, res, next) {
    res.render("pages/registration-form", { state: global.universal.stateCodes });
});
// save register details
app.post(
    "/register",
    body("email")
    .notEmpty()
    .withMessage("email cannot be empty!")
    .isEmail()
    .withMessage("please give valid email")
    .isLength({ max: 40 }),
    body("password")
    .notEmpty()
    .withMessage("password cannot be empty!")
    .isLength({ min: 8, max: 32 })
    .matches(/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,32})$/)
    .withMessage(
        "Password should be 8 in length with one uppercase and number!"
    ),
    body("cpassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
    body("firstname")
    .notEmpty()
    .withMessage("firstname cannot be empty!")
    .isLength({ max: 25 })
    .withMessage("please give valid name"),
    body("lastname")
    .notEmpty()
    .withMessage("firstname cannot be empty!")
    .isLength({ max: 25 })
    .withMessage("please give valid name"),
    body("address")
    .optional({ checkFalsy: true })
    .isLength({ max: 30 })
    .withMessage("please give valid address"),
    body("city")
    .optional({ checkFalsy: true })
    .isLength({ max: 25 })
    .withMessage("please give valid city"),
    body("state")
    .custom((value, { req }) => {
        if (!value) {
            return true;
        } else {
            if (global.universal.stateCodes.includes(value.toUpperCase())) {
                return true
            }
            throw new Error("State should be 2 digit and valid");
        }
    }),
    body("postalCode")
    .optional({ checkFalsy: true })
    .isLength({ max: 5, min: 5 })
    .isDecimal()
    .withMessage("please give valid postal code"),
    body("phone")
    .custom((value, { req }) => {
        const newValue = value.replace(/-/g, "");
        if (!value) {
            return true;
        } else {
            if (value[3] !== '-' || value[7] !== '-') {
                throw new Error("Not a valid phone number, please check the format!")
            }
            if (/^\d{10}$/.test(newValue)) {
                return true

            }
            throw new Error("Not a valid phone number!")
        }
    }),
    registerUser
);
// check login details
app.post(
    "/login",
    body("email")
    .notEmpty()
    .withMessage("email cannot be empty!")
    .isEmail()
    .withMessage("please give valid email"),
    body("password")
    .notEmpty()
    .withMessage("password cannot be empty!")
    .isLength({ min: 5 }),
    checkLogin
);
app.get("/logout", function(req, res) {
    req.session.destroy();
    res.render("pages/logout");
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.render("pages/error");
})
app.listen(8080);
console.log("Server is listening on port 8080");