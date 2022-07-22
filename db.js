import { MongoClient } from 'mongodb'

let dbConnection

const connectDB =  {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/PMS')
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}
export {connectDB}