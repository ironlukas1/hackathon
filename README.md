HACKATHON

TO DO:
1. fetch (ziskavanie dat)
2. backend s databazou
3. sqlite
4. backend nakodit v com chces, ale napriklad python
5. frontend bud javascript (frameworky ako react, vue, angular) alebo cisty javascript alebo C# (blazor)

async function updateCuisine(restaurantId, newCuisine) {
  const updatedRestaurant = await prisma.restauracie.update({
    where: {
      id: 1, // Use the provided restaurantId
    },
    data: {
      cuisine: "Kaviereň", // Use the provided newCuisine value
    },
  });
  console.log('Updated restaurant:', updatedRestaurant);
}

updateCuisine(1, "Updated Cuisine") // Replace `1` with the actual ID
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });



var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
