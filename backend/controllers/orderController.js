const data = require('../data');

exports.placeOrder = (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const cart = data.carts[username] || [];
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const order = {
    id: data.orders.length + 1,
    username,
    items: [...cart],
    total,
    status: 'Pending',
    date: new Date()
  };

  data.orders.push(order);
  data.carts[username] = []; // clear cart

  res.status(201).json({ message: 'Order placed successfully', order });
};

exports.getOrders = (req, res) => {
  const username = req.params.username;
  const userOrders = data.orders.filter(o => o.username === username);
  res.json(userOrders);
};
