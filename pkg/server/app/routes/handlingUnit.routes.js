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
const handlingUnitController = require("../controllers/handlingUnit.controller");
const postHandlingUnit = handlingUnitController.postHandlingUnit;
const getAllHandlingUnits = handlingUnitController.getAllHandlingUnits;
const deleteHandlingUnit = handlingUnitController.deleteHandlingUnit;
const putHandlingUnit = handlingUnitController.putHandlingUnit;
const validateAccessToken = accessToken.validateAccessToken;

module.exports = (app) => {
  // POST new handlingUnit
  app.post("/handlingUnits", validateAccessToken, postHandlingUnit);

  // GET all handlingUnits

  app.get("/handlingUnits", validateAccessToken, getAllHandlingUnits);

  // DELETE a handlingUnit by id
  app.delete("/handlingUnits/:id", validateAccessToken, deleteHandlingUnit);

  // PUT a handlingUnit b id
  app.put("/handlingUnits/:id", validateAccessToken, putHandlingUnit);
};