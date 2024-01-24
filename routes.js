import express from "express";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

import startApply from "./controller.careerjet.js";

//Base get to URL
router.get("/", (req, res) => {
    res.send("API Working");
});

// Check Login
router.post("/startapply", startApply);

export default router;