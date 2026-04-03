const data = require('../data');

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const existingUser = data.users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: data.users.length + 1, username, password };
  data.users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: { username } });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = data.users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', username: user.username });
};
