const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middleware
app.use(express.json());
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// basic example for how to serve static
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from custom middleware');
  next();
});

//add data to the request with middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

// mount routers

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;