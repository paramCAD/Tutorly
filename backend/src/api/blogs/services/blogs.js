const db = require("../models/blogs");

exports.createBlogs = (req, res) => {
    let blogs = new db({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        img: req.file.buffer,
        user_id: req.body.user_id
    });
    blogs.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        return blogs;
    });
    
    
};


exports.getBlogs = async (req, res) => {
    const data=db.find({ })
      return data;

}