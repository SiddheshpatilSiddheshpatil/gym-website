const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/gymDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

/* Schema */
const joinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* Model */
const Join = mongoose.model("Join", joinSchema);

/* API Route */
app.post("/api/join", async (req, res) => {
    try {
        const { name, email, phone, plan, message } = req.body;

        if (!name || !email || !phone || !plan) {
            return res.status(400).json({ message: "All required fields missing" });
        }

        const newJoin = new Join({
            name,
            email,
            phone,
            plan,
            message
        });

        await newJoin.save();
        res.status(201).json({ message: "Join plan data saved successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

/* Server Start */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
