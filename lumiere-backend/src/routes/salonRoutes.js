const express = require("express");
const { supabase } = require("../config/supabase");

const router = express.Router();

// Get all salons
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("salons")
      .select("*")
      .order("rating", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      salons: data || [],
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get single salon by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("salons")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Salon not found",
      });
    }

    res.json({
      success: true,
      salon: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
