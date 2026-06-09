const express = require("express");
const { supabase } = require("../config/supabase");

const router = express.Router();

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { name, phone, profile_image } = req.body;

    const { data, error } = await supabase
      .from("profiles")
      .update({ name, phone, profile_image, updated_at: new Date() })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, profile: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    res.json({ success: true, profile: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
