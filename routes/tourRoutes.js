const express = require('express');
const fs = require('fs');

// read the data once as input
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const router = express.Router();

const getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)
  if (!tour) {
    return res.status(404).json(
      {
        status: 'fail', 
        message: 'id not found'
      }
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json(
      {status: 'success', 
      data: {tour: newTour}
      }
    )
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json(
      {
        status: 'fail', 
        message: 'id not found'
      }
    );
  }
  res.status(200).json(
    {
      status:'success',
      data: {
        tour: 'patch route success.  fake update'
      }
    }
  )
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json(
      {
        status: 'fail', 
        message: 'id not found'
      }
    );
  }
  res.status(200).json(
    {
      status:'success',
      data: 'fake delete route test'
    }
  )
};

router.route('/')
  .get(getAllTours)
  .post(createTour);

router.route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  module.exports = router;