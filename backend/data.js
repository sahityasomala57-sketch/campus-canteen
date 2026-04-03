module.exports = {
  users: [],
  menu: [
    { id: 1, name: 'Samosa', price: 15, category: 'Snacks' },
    { id: 2, name: 'Masala Dosa', price: 50, category: 'Breakfast' },
    { id: 3, name: 'Veg Biryani', price: 120, category: 'Main Course' },
    { id: 4, name: 'Idli Vada', price: 40, category: 'Breakfast' },
    { id: 5, name: 'Paneer Butter Masala', price: 140, category: 'Main Course' },
    { id: 6, name: 'Butter Naan', price: 25, category: 'Breads' },
    { id: 7, name: 'Gulab Jamun', price: 20, category: 'Dessert' },
    { id: 8, name: 'Tea/Coffee', price: 10, category: 'Beverages' }
  ],
  carts: {}, // username -> array of items
  orders: []
};
