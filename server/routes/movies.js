//Andres Felipe Cuero 
//ID: 301203787
//COMP229-S2022-MidTerm

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render('movies/details', {title: 'Add', page: 'movies/details', movies: ''});

});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     let movie = new movies ({
      "Title": req.body.title,
      "Description": req.body.description,
      "Released": req.body.released,
      "Director": req.body.director,
      "Genre": req.body.genre,
    });

    movies.create(movie, (err)=> {
      if(err) {
        console.error(err);
        res.end(err);
      };
      res.redirect('/movies');
    })

});

// GET the Movies Details page in order to edit an existing Movies
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     movies.findById(req.params.id, (err, movie) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      res.render('movies/details', {title: 'Edit', page: 'movies/details', movies: movie});
    }
    )
    
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;
     let movie = new movies({
         "_id": id,
         "Title": req.body.title,
         "Description": req.body.description,
         "Released": req.body.released,
         "Director": req.body.director,
         "Genre": req.body.genre,
     });
 
     movies.updateOne({ _id: id }, movie, {}, (err) => {
         if (err) {
             console.error(err);
             res.redirect('/movies');
          res.end(err);
         }
 
         res.redirect('/movies');
     })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     movies.findByIdAndRemove(req.params.id, (err) => {
      if(err) {
        console.error(err);
        res.end(err);
      }
      res.redirect('/movies');
    } ) 
});


module.exports = router;
