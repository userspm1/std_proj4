const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFSBucket } = require('mongodb');
// Initialize GridFS Stream
let gfs;
const conn = mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, {
      bucketName: 'uploads'
    });
    console.log('GridFSBucket initialized:', gfs);
});

module.exports = { gfs };
