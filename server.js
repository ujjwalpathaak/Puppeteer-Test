import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import router from "./routes.js";

const app = express();

var PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/", router);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});