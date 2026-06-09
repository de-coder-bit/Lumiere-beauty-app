const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('bookings').select('*');
  res.json({ success: !error, bookings: data || [], error: error?.message });
});

router.post('/', async (req, res) => {
  const { user_id, salon_id, service_name, date, time, price } = req.body;
  const { data, error } = await supabase.from('bookings').insert([{
    user_id, salon_id, service_name, date, time, price, status: 'pending'
  }]).select();
  res.json({ success: !error, booking: data?.[0], error: error?.message });
});

module.exports = router;
