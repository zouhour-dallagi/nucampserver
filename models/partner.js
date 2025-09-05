const express = require('express');
const Partner = require('../models/partner'); 
const partnerRouter = express.Router();

partnerRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const partners = await Partner.find({});
      res.status(200).json(partners);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newPartner = await Partner.create(req.body);
      res.status(201).json(newPartner);
    } catch (err) {
      next(err);
    }
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /partners');
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Partner.deleteMany({});
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

partnerRouter.route('/:partnerId')
  .get(async (req, res, next) => {
    try {
      const partner = await Partner.findById(req.params.partnerId);
      res.status(200).json(partner);
    } catch (err) {
      next(err);
    }
  })
  .post((req, res) => {
    res.status(403).send(`POST operation not supported on /partners/${req.params.partnerId}`);
  })
  .put(async (req, res, next) => {
    try {
      const updatedPartner = await Partner.findByIdAndUpdate(
        req.params.partnerId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPartner);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await Partner.findByIdAndDelete(req.params.partnerId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

module.exports = partnerRouter;
