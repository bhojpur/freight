// Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const offerModel = require("../models/offer.model");

const insertOffer = offerModel.insertOffer;
const selectAllOffers = offerModel.selectAllOffers;
const deleteFromOffersById = offerModel.deleteFromOffersById;
const updateOffer = offerModel.updateOffer;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllOffers, postOffer, deleteOffer, putOffer };

async function postOffer(req, res) {
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const user = req.user;

  //create new carrier
  const newOffer = await insertOffer({
    quoteRequestId,
    carrierId,
    rate,
    notes,
  });
  //send response
  const camelOffer = keysToCamel(newOffer);
  res.json(camelOffer);
}

//get all offers
async function getAllOffers(req, res) {
  try {
    const allOffers = await selectAllOffers();
    const allOffersCamelCase = allOffers.map((offer) => {
      return keysToCamel(offer);
    });
    res.json(allOffersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteOffer(req, res) {
  const { id } = req.params;
  const deletedOffer = await deleteFromOffersById(id);
  const camelDeletedOffer = keysToCamel(deletedOffer);
  res.json(camelDeletedOffer);
}

//update a carrier

async function putOffer(req, res) {
  const { id } = req.params;
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const updatedOffer = await updateOffer(id, {
    quoteRequestId,
    carrierId,
    rate,
    notes,
  });
  const camelUpdatedOffer = keysToCamel(updatedOffer);
  res.json(camelUpdatedOffer);
}