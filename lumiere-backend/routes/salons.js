const express = require('express');
const router = express.Router();

// Temporary mock data (jab tak Supabase fix nahi hota)
const mockSalons = [
  { 
    id: "0874fadd-5742-41e0-9e70-9e30c4d81dd0", 
    name: "The Velvet Studio", 
    address: "MG Road, Bangalore",
    description: "Premium hair styling",
    rating: 4.5,
    price_range: "₹500-2000"
  },
  { 
    id: "09553577-3ed8-488f-8d4e-22f6ccce22d", 
    name: "Maison de Lumière", 
    address: "Indiranagar, Bangalore",
    description: "Luxury hair and beauty salon",
    rating: 4.8,
    price_range: "₹800-3000"
  },
  { 
    id: "0a3fe333-5ca0-4526-9ed4-0e72abc10d0f", 
    name: "Aura Botanical", 
    address: "Koramangala, Bangalore",
    description: "Organic beauty treatments",
    rating: 4.3,
    price_range: "₹400-1500"
  }
];

// GET /api/salons
router.get('/', (req, res) => {
  console.log('✅ Salons API called');
  res.json({ 
    success: true, 
    salons: mockSalons,
    count: mockSalons.length
  });
});

// GET /api/salons/:id
router.get('/:id', (req, res) => {
  const salon = mockSalons.find(s => s.id === req.params.id);
  if (salon) {
    res.json({ success: true, salon });
  } else {
    res.json({ success: false, message: 'Salon not found' });
  }
});

module.exports = router;
