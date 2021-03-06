const app = require('express').Router();
module.exports = app;
const { Category } = require('../db').models;

app.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next);
});

app.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send(category))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => {
      Object.assign(category, req.body);
      return category.save();
    })
    .then(category => res.send(category))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

