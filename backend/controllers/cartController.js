const data = require('../data');

exports.getCart = (req, res) => {
  const username = req.params.username;
  const cart = data.carts[username] || [];
  res.json(cart);
};

exports.addToCart = (req, res) => {
  const { username, itemId, quantity = 1 } = req.body;
  
  if (!username || !itemId) {
    return res.status(400).json({ message: 'Username and itemId are required' });
  }

  const menuItem = data.menu.find(m => m.id === itemId);
  if (!menuItem) {
    return res.status(404).json({ message: 'Item not found in menu' });
  }

  if (!data.carts[username]) {
    data.carts[username] = [];
  }

  const cart = data.carts[username];
  const existingItemIndex = cart.findIndex(item => item.id === itemId);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ ...menuItem, quantity });
  }

  res.json({ message: 'Item added to cart', cart });
};
