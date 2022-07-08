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

const laneStopModel = require("../models/laneStop.model");

const insertLaneStop = laneStopModel.insertLaneStop;
const selectAllLaneStops = laneStopModel.selectAllLaneStops;
const deleteFromLaneStopsById = laneStopModel.deleteFromLaneStopsById;
const updateLaneStop = laneStopModel.updateLaneStop;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllLaneStops, postLaneStop, deleteLaneStop, putLaneStop };

async function postLaneStop(req, res) {
  const { cityId, isOrigin, quoteRequestId } = req.body;

  //create new laneStop
  const newLaneStop = await insertLaneStop({
    cityId,
    isOrigin,
    quoteRequestId,
  });
  //send response
  const newLaneStopCamelCase = keysToCamel(newLaneStop);
  res.json(newLaneStopCamelCase);
}

//get all laneStops
async function getAllLaneStops(req, res) {
  try {
    const allLaneStops = await selectAllLaneStops();
    const allLaneStopsCamelCase = allLaneStops.map((laneStop) => {
      return keysToCamel(laneStop);
    });

    res.json(allLaneStopsCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a laneStop
async function deleteLaneStop(req, res) {
  const { id } = req.params;
  const deletedLaneStop = await deleteFromLaneStopsById(id);
  const deletedLaneStopCamelCase = keysToCamel(deletedLaneStop);
  res.json(deletedLaneStopCamelCase);
}

//update a laneStop

async function putLaneStop(req, res) {
  const { id } = req.params;
  const { cityId, isOrigin, quoteRequestId } = req.body;
  const updatedLaneStop = await updateLaneStop({
    cityId,
    isOrigin,
    quoteRequestId,
  });
  const updatedLaneStopCamelCase = keysToCamel(updatedLaneStop);
  res.json(updatedLaneStopCamelCase);
}