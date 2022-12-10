require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const helmet = require('helmet');


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", require("./routes/user.route"));
app.use("/table", require("./routes/CreateTable.route"));

const URI = process.env.MONGODB_URL;

mongoose.connect(
  "mongodb+srv://harouna:allahouakbar@cluster0.okqcndj.mongodb.net/?retryWrites=true&w=majority",
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connecté a mongo db");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("le serveur tourne sur le port ", PORT);
});