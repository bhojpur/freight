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

const pool = require("./db");

module.exports = {
  insertQuoteRequest,
  selectAllQuoteRequests,
  deleteFromQuoteRequestsById,
  updateQuoteRequest,
};

async function insertQuoteRequest({
  salesRepId,
  customerId,
  date,
  equipmentType,
}) {
  try {
    const newQuoteRequest = await pool.query(
      "INSERT INTO quote_requests (sales_rep_id, customer_id, date, equipment_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [salesRepId, customerId, date, equipmentType]
    );
    return newQuoteRequest.rows[0];
  } catch (err) {
    console.error("quoteRequest.model " + err.message);
  }
}

//select all quoteRequests from the database

async function selectAllQuoteRequests() {
  try {
    const allQuoteRequests = await pool.query(`
SELECT quote_requests.id, quote_requests.date, quote_requests.equipment_type, customers.company_name, origin.name AS origin_name, destination.name AS destination_name from quote_requests 
INNER JOIN customers ON (quote_requests.customer_id = customers.id)
INNER JOIN (
	SELECT * FROM lane_stops INNER JOIN cities ON (lane_stops.city_id = cities.id) WHERE is_origin
) AS origin ON (quote_requests.id = origin.quote_request_id)
INNER JOIN (
	SELECT * from lane_stops INNER JOIN cities ON (lane_stops.city_id = cities.id) WHERE is_origin = false
) AS destination ON (quote_requests.id = destination.quote_request_id)`); //returns an array of objects
    return allQuoteRequests.rows;
  } catch (err) {
    console.error("selectAllQuoteRequests error: " + err.message);
  }
}

//put/update a quoteRequest in the database

async function updateQuoteRequest(id, { salesRepId, customerId }) {
  try {
    const newQuoteRequest = await pool.query(
      "UPDATE quote_requests SET sales_rep_id = $1, customer_id = $2 WHERE id = $3 RETURNING *",
      [salesRepId, customerId]
    );
    return newQuoteRequest.rows[0];
  } catch (err) {
    console.error("putQuoteRequest error: " + err.message);
  }
}

//delete a quoteRequest from the database

async function deleteFromQuoteRequestsById(id) {
  try {
    const deletedQuoteRequest = await pool.query(
      "DELETE FROM quoteRequests WHERE id = $1",
      [id]
    );
    return deletedQuoteRequest.rows;
  } catch (err) {
    console.error("deleteQuoteRequest error: " + err.message);
  }
}

/*
// Find a single quoteRequest by Name
async function findQuoteRequestByName(quoteRequestName) {
  try {
    const quoteRequest = await pool.query(
      `SELECT * FROM quoteRequests WHERE quoteRequestName = '${quoteRequestName}'`
    );
    res.json(newQuoteRequest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all quoteRequests for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM quoteRequests WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`quoteRequests: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_quoteRequests_found` }, null);
    }
  );
}

// Update QuoteRequest by Id
async function updateQuoteRequestById(id, quoteRequest, result) {
  await pool.query(
    `UPDATE quoteRequests SET quoteRequestName = ? WHERE id = ?`,
    [quoteRequest.quoteRequestName, id],
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: `not_found` }, null);
        return;
      }
      console.log(`updated quoteRequests: `, {
        id: id,
        quoteRequestName: quoteRequest.quoteRequestName,
      });
      result(null, { id: id, quoteRequestName: quoteRequest.quoteRequestName });
    }
  );
}

// Delete a quoteRequest by Id
async function removeQuoteRequest(id, result) {
  await pool.query(`DELETE FROM quoteRequests WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted quoteRequest with id: ${id}`);
    result(null, res);
  });
}

*/