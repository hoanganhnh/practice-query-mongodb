import express from 'express'
import { connectDB } from './db.js'
import { ObjectId } from 'mongodb'

// init app & middleware
const app = express()

// db connection
let db

connectDB.connectToDb((err) => {
  if(!err){
    app.listen('3000', () => {
      console.log('app listening on port 3000')
    })
    db = connectDB.getDb()
  }
})

// routes
app.get('/posts', (req, res) => {
  let books = []

  db.collection('posts')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.get('/posts/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('posts')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not fetch the document'})
      })
      
  } else {
    res.status(500).json({error: 'Could not fetch the document'})
  }

})

app.post('/posts', (req, res) => {
    const newBook = req.body;
    db.collection('posts')
      .insertOne(newBook)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({err: "Could not create a new doc"});
      })
})
