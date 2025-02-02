const db = require('../models/appModel.js');

const eventController = {};

eventController.newEvent = (req, res, next) => {
  console.log('entered the eventController.newEvent');
  const { name, rules, prize, start_date, end_date } = req.body;
  const eventValues = [name, rules, prize, start_date, end_date];
  const myQuery =
    'INSERT INTO events ( name, rules, prize, start_date, end_date) VALUES( $1, $2, $3, $4, $5) RETURNING id, start_date, end_date';
  db.query(myQuery, eventValues)
    .then((data) => {
      console.log(data.rows);
      res.locals.eventId = data.rows[0].id;
      res.locals.startDate = data.rows[0].start_date;
      res.locals.endDate = data.rows[0].end_date;
      console.log('res.locals.startDate', res.locals.startDate);
      return next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// eventController.getEvents = (req, res, next) => {
//   const { event_name } = req.body;
//   res.locals.results = {
//     event_name, rules, prize, start_date, end_dates,
//   };
//   next();
// };

eventController.deleteEvent = (req, res, next) => {
  const { name } = req.body;
  delEventValues = [name];
  const delEventQuery = 'DELETE FROM events Where name = $1';
  db.query(delEventQuery, delEventValues)
    .then((data) => {
      console.log(data.rows);
      res.locals.results = data;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = eventController;
