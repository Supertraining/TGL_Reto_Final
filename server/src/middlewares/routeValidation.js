
const nonExistentRoute = ((req, res, next) => {
  res.status(404).json({ error: 'Nonexistent Route' });
});

module.exports = nonExistentRoute;