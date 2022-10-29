const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../models/blog_model');

const blogIndex = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch(error => console.log(error));
};

const blogCreatePost = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(error => console.log(error));
};

const blogCreateGet = (req, res) => {
    res.render('create', { title: 'Create Blog' });
};

const blogDetails = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findById(id)
        .then(result => {
            res.render('blog', { title: 'Blog item', blog: result });
        })
        .catch(error => {
            console.log('error ', error);
        });
};

const blogDelete = (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(error => console.log(error));
};

module.exports = {
    blogIndex,
    blogCreatePost,
    blogCreateGet,
    blogDetails,
    blogDelete
};