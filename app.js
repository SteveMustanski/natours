const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middleware

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from custom middleware');
  next();
});

//add data to the request with middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const port = 3000;

// mount routers

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// start server

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});