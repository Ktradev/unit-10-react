const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth-user');
const {User, Course} = require('../models');

function asyncHandler(cb){
  return async(req, res, next) => {
    try{
  	  await cb(req, res, next);
  	}
  	catch(err){
  	  console.log(err);
      next(err);
  	}
  }
}

// Route that returns a list of users.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      id: user.id
  });
}));

//Route to post a user to DB
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body); //attempting to create user
    res.status(201).json({ "message": "Account successfully created!" });
  } 
  catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

//Route that returns all courses
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
    include: [{
      model: User,
      attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
    }]
  });

  res.json({
      courses
  });
}));

//Route that returns a specific course based on id
router.get('/courses/:id', asyncHandler(async (req, res) => {
  try {
    //req.params.id gets the id inputed and fetches corresponding course
    const course = await Course.findByPk(req.params.id, {
      attributes: {exclude: ['createdAt', 'updatedAt', 'userId']},
      include: [{
        model: User,
        attributes: {exclude: ['createdAt', 'updatedAt', 'password']}
      }]
    });

    res.json({
        course
    });
    //if there was a course
    if (course) {
      res.status(200).json(course);
    }
    //if there was not a course found with the given id 
    else {
      res.status(404).json({ message: "Course not found" });
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}));


//Route for posting a course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body); //attempt to create course
    res.location(`/courses/${course.id}`).status(201).end();
  } 
  catch (error) {
    console.error(`Error: ${error.name}`);
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } 
    else {
      throw error;
    }
  }
}));

//Route for updating a specified course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  try {
    const course = await Course.findByPk(req.params.id);

    if (user.id === course.userId) {
      if (course) {
        await course.update(req.body);
        res.sendStatus(204).end();
      } 
      else {
        res.status(400).json({ "message": "Course not found" })
      }
    } 
    else {
      res.sendStatus(403).json({ message: "Access denied" });
    }
  } 
  catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({ errors });
    } 
    else {
      throw error;
    }
  }
}));

//Route for deleting a course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const course = await Course.findByPk(req.params.id, {
    include: User,
  });

  if (course) {
    if (user.emailAddress === course.User.emailAddress) {
      await course.destroy();
      res.status(204).end();
    } 
    else {
      res.status(403).json({ message: "Access denied" });
    }
  } 
  else {
    res.status(404).json({
      message: "You tried to delete a course that does not exist.",
    });
  }
}));

module.exports = router;