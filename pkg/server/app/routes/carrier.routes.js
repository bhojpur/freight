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
const carrierController = require("../controllers/carrier.controller");
const postCarrier = carrierController.postCarrier;
const getAllCarriers = carrierController.getAllCarriers;
const deleteCarrier = carrierController.deleteCarrier;
const putCarrier = carrierController.putCarrier;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new carrier
  app.post("/carriers", validateAccessToken, postCarrier);

  // GET all carriers

  app.get("/carriers", validateAccessToken, getAllCarriers);

  // DELETE a carrier by id
  app.delete("/carriers/:id", validateAccessToken, deleteCarrier);

  // PUT a carrier b id
  app.put("/carriers/:id", validateAccessToken, putCarrier);
};