const router = require("express").Router();
const CreateTable = require("../controllers/CreateTable.controller")
const auth = require("../middleware/auth")


router.get("/getall", auth,  CreateTable.getAllTables);
router.post("/create", auth , CreateTable.createTable);

module.exports = router;