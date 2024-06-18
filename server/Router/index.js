import express from "express"
import registerUser from "../Controllers/registeruser.js";
import checkEmail from "../Controllers/CheckEmail.js";
import checkPassword from "../Controllers/checkpassword.js";
import userDeatil from "../Controllers/userDeatil.js";
import logout from "../Controllers/logout.js";
import updateuserdetail from "../Controllers/updateuserdetail.js";



const router = express.Router();
// register
router.post("/register", registerUser)
// check email
router.post("/checkemail", checkEmail)
// login
router.post("/login", checkPassword)
// get user details
router.get("/userdetail", userDeatil)
// logout
router.get("/logout", logout)
// update user details
router.post("/updateuserdetail", updateuserdetail)
export default router