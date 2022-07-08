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

const customerModel = require("../models/customer.model");

const insertCustomer = customerModel.insertCustomer;
const selectAllCustomers = customerModel.selectAllCustomers;
const deleteFromCustomersById = customerModel.deleteFromCustomersById;
const updateCustomer = customerModel.updateCustomer;

const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;
module.exports = { getAllCustomers, postCustomer, deleteCustomer, putCustomer };

async function postCustomer(req, res) {
  const {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  } = req.body;
  const user = req.user;

  //create new customer
  const newCustomer = await insertCustomer({
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  });
  //send response
  const newCustomerCamelCase = keysToCamel(newCustomer);
  res.json(newCustomerCamelCase);
}

//get all customers by sales rep id
async function getAllCustomers(req, res) {
  //parse sales rep id from jwt

  const salesRepId = req.user.id;
  const allCustomers = await selectAllCustomers(salesRepId);

  //covert each customer object to camel case
  const allCustomersCamelCase = allCustomers.map((customer) => {
    return keysToCamel(customer);
  });

  res.json(allCustomersCamelCase);
}

//delete a customer
async function deleteCustomer(req, res) {
  const { id } = req.params;
  const deletedCustomer = await deleteFromCustomersById(id);

  const deletedCustomerCamelCase = keysToCamel(deletedCustomer);
  res.json(deletedCustomerCamelCase);
}

//update a customer

async function putCustomer(req, res) {
  const { id } = req.params;
  const {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  } = req.body;
  const updatedCustomer = await updateCustomer(id, {
    salesRepId,
    companyName,
    primaryContact,
    contactEmail,
    contactPhone,
    city,
    stateProvince,
  });
  const updatedCustomerCamelCase = keysToCamel(updatedCustomer);
  res.json(updatedCustomerCamelCase);
}