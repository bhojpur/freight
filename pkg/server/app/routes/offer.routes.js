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

const accessToken = require("../auth/accessToken");
const offerController = require("../controllers/offer.controller");

const validateAccessToken = accessToken.validateAccessToken;
const postOffer = offerController.postOffer;
const getAllOffers = offerController.getAllOffers;
const deleteOffer = offerController.deleteOffer;
const putOffer = offerController.putOffer;

module.exports = (app) => {
  // POST new offer
  app.post("/offers", validateAccessToken, postOffer);

  // GET all offers

  app.get("/offers", validateAccessToken, getAllOffers);

  // DELETE a offer by id
  app.delete("/offers/:id", validateAccessToken, deleteOffer);

  // PUT a offer b id
  app.put("/offers/:id", validateAccessToken, putOffer);
};