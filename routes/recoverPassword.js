var express = require("express");
var router = express.Router();
var bcrypt=require('bcrypt');
var userModel = require("../model/user.model");
router.get("/", async (req, res, next) => {
  var message = "Lỗi xác thực";
  const user = await userModel.verifyRecoverToken(req.query.id);
  if (user.length > 0) {
    console.log("enter recoverpassword zone");
    message = "";
    const email = user[0].email;
    res.render("passwordforgot/newPassword", {
      title: "Khôi phục mật khẩu",
      message: message,
      email
    });
  } else {
    console.log("cannot enter recoverpassword zone");
    res.send(message);
  }
});
router.post("/", async (req, res, next) => {
  console.log("abc",req.body);
  if(req.body&&req.body.email&&req.body.password){
    const password=bcrypt.hashSync(req.body.password,10)
    await userModel.changePassword(req.body.email, password).catch(e=>{console.log(e)})
    res.redirect("./login");
  }else{
    res.send("loi form");
  }
});
module.exports = router;
