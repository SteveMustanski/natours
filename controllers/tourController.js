const fs = require('fs');

// read the data once as input
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
  console.log(`tour id is: ${val}`);
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json(
      {
        status: 'fail', 
        message: 'id not found'
      }
    );
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json(
    {
      status:'success',
      data: {
        tour: 'patch route success.  fake update'
      }
    }
  )
};

exports.deleteTour = (req, res) => {

  res.status(200).json(
    {
      status:'success',
      data: 'fake delete route test'
    }
  )
};