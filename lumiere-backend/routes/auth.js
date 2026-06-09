const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase"); // ➕ YEH LINE ADD KARO

// Login API with Supabase
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  console.log("Login attempt:", { email, role });

  try {
    // Check if user exists in Supabase
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Supabase error:", error);
      return res.json({ success: false, message: "Database error" });
    }

    if (!users || users.length === 0) {
      return res.json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    const user = users[0];

    // Check password
    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Check role matches
    if (user.role !== role) {
      return res.json({
        success: false,
        message: `No ${role} account found with this email`,
      });
    }

    // Login successful
    console.log("Login successful:", user.email);

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.json({ success: false, message: "Server error. Please try again." });
  }
});

// Signup API
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, phone, password, role, salonName, city } =
    req.body;

  console.log("Signup attempt:", { email, role });

  try {
    // Check if user already exists
    const { data: existing } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (existing && existing.length > 0) {
      return res.json({
        success: false,
        message: "User already exists. Please sign in.",
      });
    }

    // Insert new user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          name: `${firstName} ${lastName}`,
          email: email,
          phone: phone || null,
          password: password,
          role: role,
          salon_name: salonName || null,
          city: city || null,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.json({
        success: false,
        message: "Failed to create account. Please try again.",
      });
    }

    console.log("Signup successful:", email);

    res.json({
      success: true,
      message: "Account created successfully! Please sign in.",
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        role: newUser[0].role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.json({ success: false, message: "Server error. Please try again." });
  }
});

module.exports = router;
