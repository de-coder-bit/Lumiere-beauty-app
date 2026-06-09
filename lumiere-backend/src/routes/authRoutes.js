const express = require("express");
const { supabase } = require("../config/supabase");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({
      success: true,
      token: data.session.access_token,
      user: data.user,
    });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) throw error;

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

module.exports = router;
