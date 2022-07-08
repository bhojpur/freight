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
const cityController = require("../controllers/city.controller");
const postCity = cityController.postCity;
const getAllCities = cityController.getAllCities;
const deleteCity = cityController.deleteCity;
const putCity = cityController.putCity;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new city
  app.post("/cities", validateAccessToken, postCity);

  // GET all cities

  app.get("/cities", getAllCities);

  // DELETE a city by id
  app.delete("/cities/:id", validateAccessToken, deleteCity);

  // PUT a city b id
  app.put("/cities/:id", validateAccessToken, putCity);
};