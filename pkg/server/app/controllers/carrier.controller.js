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

const carrierModel = require("../models/carrier.model");

const insertCarrier = carrierModel.insertCarrier;
const selectAllCarriers = carrierModel.selectAllCarriers;
const deleteFromCarriersById = carrierModel.deleteFromCarriersById;
const updateCarrier = carrierModel.updateCarrier;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllCarriers, postCarrier, deleteCarrier, putCarrier };

async function postCarrier(req, res) {
  const { carrierName, phone, contactExt, contactEmail, contactName, userId } =
    req.body;
  const user = req.user;

  //create new carrier
  const newCarrier = await insertCarrier({
    carrierName,
    phone,
    contactExt,
    contactEmail,
    contactName,
    userId: user.id,
  });
  //send response
  console.log(newCarrier);
  const newCarrierCamelCase = keysToCamel(newCarrier);

  res.json(newCarrierCamelCase);
}

//get all carriers
async function getAllCarriers(req, res) {
  try {
    const allCarriers = await selectAllCarriers();

    //covert each carrier object to camel case

    const allCarriersCamelCase = allCarriers.map((carrier) => {
      return keysToCamel(carrier);
    });

    res.json(allCarriersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteCarrier(req, res) {
  const { id } = req.params;
  const deletedCarrier = await deleteFromCarriersById(id);

  const deletedCarrierCamelCase = keysToCamel(deletedCarrier);
  res.json(deletedCarrierCamelCase);
}

//update a carrier

async function putCarrier(req, res) {
  const { id } = req.params;
  const {
    carrier_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  } = req.body;
  const updatedCarrier = await updateCarrier(id, {
    carrier_name,
    phone,
    contact_ext,
    contact_email,
    contact_name,
    user_id,
  });
  const updatedCarrierCamelCase = keysToCamel(updatedCarrier);
  res.json(updatedCarrierCamelCase);
}