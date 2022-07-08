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

const quoteRequestModel = require("../models/quoteRequest.model");

const insertQuoteRequest = quoteRequestModel.insertQuoteRequest;
const selectAllQuoteRequests = quoteRequestModel.selectAllQuoteRequests;
const deleteFromQuoteRequestsById =
  quoteRequestModel.deleteFromQuoteRequestsById;
const updateQuoteRequest = quoteRequestModel.updateQuoteRequest;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = {
  getAllQuoteRequests,
  postQuoteRequest,
  deleteQuoteRequest,
  putQuoteRequest,
};

async function postQuoteRequest(req, res) {
  const { salesRepId, customerId, date, equipmentType } = req.body;
  console.log(req.body);

  //create new quoteRequest
  const newQuoteRequest = await insertQuoteRequest({
    salesRepId,
    customerId,
    date,
    equipmentType,
  });
  //send response

  const camelQuoteRequest = keysToCamel(newQuoteRequest);
  console.log(camelQuoteRequest);
  res.json(camelQuoteRequest);
}

//get all quoteRequests
async function getAllQuoteRequests(req, res) {
  try {
    const allQuoteRequests = await selectAllQuoteRequests();
    console.log(allQuoteRequests);
    //get type of date property
    const date = allQuoteRequests[0].date;
    console.log(date);
    console.log(date instanceof Date);
    const allQuoteRequestsCamelCase = allQuoteRequests.map((quoteRequest) => {
      return keysToCamel(quoteRequest);
    });

    res.json(allQuoteRequestsCamelCase);
    console.log(allQuoteRequestsCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a carrier
async function deleteQuoteRequest(req, res) {
  const { id } = req.params;
  const deletedQuoteRequest = await deleteFromQuoteRequestsById(id);
  res.json(deletedQuoteRequest);
}

//update a carrier

async function putQuoteRequest(req, res) {
  const { id } = req.params;
  const { quoteRequestId, carrierId, rate, notes } = req.body;
  const updatedQuoteRequest = await updateQuoteRequest(id, {
    salesRepId,
    customerId,
  });
  res.json(updatedQuoteRequest);
}