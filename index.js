const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/notes");

//connection to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/notesByAuthor")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);

const PORT = 8082;
//app running at port 8082
app.listen(PORT, () => console.log(`listening at port ${PORT}`));
