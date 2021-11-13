const { validationResult } = require("express-validator");

const checkLogin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.errors[0].msg);
    res.redirect("/login");
    return;
  }
  const universal = global.universal
  const { email, password } = req.body;
  const currentUser = universal.users.find(
    (user) => user.email === email && user.password === password
  );
  if (!currentUser) {
    req.flash("error", "Username or password incorrect");
    res.redirect("/login");
    return;
  }
  req.session.user = currentUser
  res.redirect("/");
};

const registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("error", errors.errors[0].msg);
    res.redirect("/register");
    return;
  }
  const { models, users } = global.universal
  const { email, password, phone, postalCode, state, city, address, lastname, firstname } = req.body
  const currentUser = users.find(
    (user) => user.email === email
  );
  if (currentUser) {
    req.flash("error", "Email already exist");
    res.redirect("/register");
    return;
  }
  const user = new models.User()
  user.email = email;
  user.password = password;
  user.phone = phone;
  user.postalCode = postalCode;
  user.state = state;
  user.city = city;
  user.lastname = lastname,
  user.address = address;
  user.firstname = firstname
  
  users.push(user);
  req.session.user = user
  res.redirect("/");
}

module.exports = {
  checkLogin,
  registerUser
};
