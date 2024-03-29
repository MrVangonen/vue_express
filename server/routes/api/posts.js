const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//Add post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://dbUser:dbUser@mycluster-drb7v.mongodb.net/test?retryWrites=true&w=majority',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  return client.db('myClaster').collection('posts');
}

module.exports = router;