const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register);

router.get("/admin", auth, userCtrl.getAdmin);

router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgotPassword);

router.post("/reset", auth, userCtrl.resetPassword); //* auth,

router.get("/infor", auth, userCtrl.getUserInfor);

router.get("/all_infor", auth, userCtrl.getUsersAllInfor); //* auth,

router.get("/logout", auth, userCtrl.logout); //* auth,

router.patch("/update", auth, userCtrl.updateUser); //* auth,

router.patch("/update_role/:id",  userCtrl.updateUsersRole); //* auth,

router.patch("/ambassador", auth, userCtrl.UserAmbassador); //* auth,

router.delete("/delete/:id",  userCtrl.deleteUser); //* auth,

module.exports = router;
