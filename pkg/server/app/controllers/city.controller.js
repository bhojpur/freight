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

const cityModel = require("../models/city.model");

const insertCity = cityModel.insertCity;
const selectAllCities = cityModel.selectAllCities;
const deleteFromCitiesById = cityModel.deleteFromCitiesById;
const updateCity = cityModel.updateCity;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

async function postCity(req, res) {
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const user = req.user;

  //create new city
  const newCity = await insertCity({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  //send response
  const newCityCamelCase = keysToCamel(newCity);
  res.json(newCityCamelCase);
}

//get all citys
async function getAllCities(req, res) {
  try {
    const allCities = await selectAllCities();
    const allCitiesCamelCase = allCities.map((city) => {
      return keysToCamel(city);
    });

    res.json(allCitiesCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a city
async function deleteCity(req, res) {
  const { id } = req.params;
  const deletedCity = await deleteFromCitiesById(id);
  const deletedCityCamelCase = keysToCamel(deletedCity);
  res.json(deletedCityCamelCase);
}

//update a city

async function putCity(req, res) {
  const { id } = req.params;
  const { name, stateProvinceId, stateProvinceName } = req.body;
  const updatedCity = await updateCity({
    name,
    stateProvinceId,
    stateProvinceName,
  });
  const updatedCityCamelCase = keysToCamel(updatedCity);
  res.json(updatedCityCamelCase);
}
module.exports = { getAllCities, postCity, deleteCity, putCity };