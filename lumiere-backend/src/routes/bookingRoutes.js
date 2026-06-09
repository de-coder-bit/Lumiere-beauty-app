const express = require("express");
const { supabase } = require("../config/supabase");

const router = express.Router();

// Get user's bookings
router.get("/", async (req, res) => {
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
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, bookings: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create booking
router.post("/", async (req, res) => {
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

    const { salon_id, service_id, booking_date, booking_time } = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          salon_id,
          service_id,
          booking_date,
          booking_time,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, booking: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
