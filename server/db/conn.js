const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log("Error: ", error);
    process.exit(1); 
  });

module.exports = mongoose;
