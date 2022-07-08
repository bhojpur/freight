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

const handlingUnitModel = require("../models/handlingUnit.model");

const insertHandlingUnit = handlingUnitModel.insertHandlingUnit;
const selectAllHandlingUnits = handlingUnitModel.selectAllHandlingUnits;
const deleteFromHandlingUnitsById =
  handlingUnitModel.deleteFromHandlingUnitsById;
const updateHandlingUnit = handlingUnitModel.updateHandlingUnit;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = {
  getAllHandlingUnits,
  postHandlingUnit,
  deleteHandlingUnit,
  putHandlingUnit,
};

async function postHandlingUnit(req, res) {
  const {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  } = req.body;

  //create new handlingUnit
  const newHandlingUnit = await insertHandlingUnit({
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  });
  //send response
  const camelHandlingUnit = keysToCamel(newHandlingUnit);

  res.json(camelHandlingUnit);
}

//get all handlingUnits
async function getAllHandlingUnits(req, res) {
  try {
    const allHandlingUnits = await selectAllHandlingUnits();
    const allHandlingUnitsCamelCase = allHandlingUnits.map((handlingUnit) => {
      return keysToCamel(handlingUnit);
    });

    res.json(allHandlingUnitsCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a handlingUnit
async function deleteHandlingUnit(req, res) {
  const { id } = req.params;
  const deletedHandlingUnit = await deleteFromHandlingUnitsById(id);
  const camelHandlingUnit = keysToCamel(deletedHandlingUnit);
  res.json(camelHandlingUnit);
}

//update a handlingUnit

async function putHandlingUnit(req, res) {
  const { id } = req.params;
  const {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  } = req.body;
  const updatedHandlingUnit = await updateHandlingUnit(id, {
    quoteRequestId,
    type,
    weightLbs,
    lengthInches,
    widthInches,
    heightInches,
    quantity,
  });
  const camelHandlingUnit = keysToCamel(updatedHandlingUnit);
  res.json(camelHandlingUnit);
}