const mongoose = require('mongoose')

const app = require('./app')

const start = () => {
  //DB connection
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
  connectDB()

  //App start
  const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`Server started listening on port ${port}!`))
}

start()