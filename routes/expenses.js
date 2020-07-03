const express = require('express');
const Expense = require('../models/expenses');
const { validation } = require('../validation');

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const exp = await Expense.find({})
      .select({amount: 1, date: 1, category: 1, info: 1});
    
    if(!exp) {
      res.status(404)
        .send('Not found');
    }

    res.send(exp);
  } catch(ex) {
    res.status(500)
      .send(ex.message);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const exp = await Expense.find({_id: req.params.id})
      .select({amount: 1, date: 1, category: 1, info: 1});
    
    if(!exp) {
      res.status(404)
        .send('Not found');
    }

    res.send(exp);
  } catch(ex) {
    res.status(500)
      .send(ex.message);
  }
});

router.post('/', async ({ body }, res) => {
  const { error } = validation(body);
  
  if(error) {
    res.status(400)
      .send(error.message);
    return;
  }

  try {
    const {amount, date, category, info} = body;

    const exp = new Expense({ amount, date, category, info });

    await exp.save( err => {
      if(err) {
        res.status(500)
          .send(err.message);
      }
    });

    res.send(exp);
  } catch(ex) {
    res.status(500)
      .send(ex.message);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validation(req.body);
  
  if(error) {
    res.status(400)
      .send(error.message);
    return;
  }
  
  try {
    const { amount, date, category, info } = req.body;

    const expense = await Expense.findOneAndUpdate({_id: req.params.id}, 
      { $set: {amount, date, category, info} },
      { new: true });

    if(!expense) {
      res.status(404)
        .send(new Error('Not Found'));
    }

    res.send(expense);
  } catch(ex) {
    res.status(500)
      .send(ex.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedExp = await Expense.deleteOne({_id: req.params.id});

    if(!deletedExp) {
      res.status(404)
        .send(new Error('Not Found'));
    }

    res.send(deletedExp);
  } catch(ex) {
    res.status(500)
      .send(ex.message);
  }
});

module.exports = router;

604903061