const app = require('./src/app')
const mongoConnect = require('./src/db/mongodb/mongoConnect')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  mongoConnect()
  console.log(`Server running on port ${PORT}`)
});