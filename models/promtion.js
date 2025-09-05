const express = require('express');
const Promotion = require('../models/promotion'); 

const promotionRouter = express.Router();

promotionRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const promotions = await Promotion.find({});
      res.status(200).json(promotions);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newPromotion = await Promotion.create(req.body);
      res.status(201).json(newPromotion);
    } catch (err) {
      next(err);
    }
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /promotions');
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Promotion.deleteMany({});
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

promotionRouter.route('/:promotionId')
  .get(async (req, res, next) => {
    try {
      const promotion = await Promotion.findById(req.params.promotionId);
      res.status(200).json(promotion);
    } catch (err) {
      next(err);
    }
  })
  .post((req, res) => {
    res.status(403).send(`POST operation not supported on /promotions/${req.params.promotionId}`);
  })
  .put(async (req, res, next) => {
    try {
      const updatedPromotion = await Promotion.findByIdAndUpdate(
        req.params.promotionId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPromotion);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Promotion.findByIdAndDelete(req.params.promotionId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

module.exports = promotionRouter;
