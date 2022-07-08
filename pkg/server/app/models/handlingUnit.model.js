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
  insertHandlingUnit,
  selectAllHandlingUnits,
  deleteFromHandlingUnitsById,
  updateHandlingUnit,
};

async function insertHandlingUnit({
  quoteRequestId,
  type,
  weightLbs,
  lengthInches,
  widthInches,
  heightInches,
  quantity,
}) {
  try {
    const handlingUnit = await pool.query(
      "INSERT INTO handling_units (quote_request_id, type, weight_lbs, length_inches, width_inches, height_inches, quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        quoteRequestId,
        type,
        weightLbs,
        lengthInches,
        widthInches,
        heightInches,
        quantity,
      ]
    );
    return handlingUnit.rows;
  } catch (err) {
    console.error("handlingUnit.model " + err.message);
  }
}

//select all handlingUnits from the database

async function selectAllHandlingUnits() {
  try {
    const allHandlingUnits = await pool.query("SELECT * FROM handling_units "); //returns an array of objects
    return allHandlingUnits.rows;
  } catch (err) {
    console.error("selectAllHandlingUnits error: " + err.message);
  }
}

//put/update a handlingUnit in the database

async function updateHandlingUnit({
  quoteRequestId,
  type,
  weightLbs,
  lengthInches,
  widthInches,
  heightInches,
  quantity,
}) {
  try {
    const newHandlingUnit = await pool.query(
      "UPDATE handling_units SET quote_request_id = $1, type = $2, weight_lbs = $3, length_inches = $4, width_inches = $5, height_inches = $6, quantity = $7, RETURNING *",
      [
        quoteRequestId,
        type,
        weightLbs,
        lengthInches,
        widthInches,
        heightInches,
        quantity,
      ]
    );
    console.log("model" + newHandlingUnit.rows);
    return newHandlingUnit.rows;
  } catch (err) {
    console.error("putHandlingUnit error: " + err.message);
  }
}

//delete a handlingUnit from the database

async function deleteFromHandlingUnitsById(id) {
  try {
    const deletedHandlingUnit = await pool.query(
      "DELETE FROM handling_units WHERE id = $1",
      [id]
    );
    return deletedHandlingUnit.rows;
  } catch (err) {
    console.error("deleteHandlingUnit error: " + err.message);
  }
}

/*
// Find a single handlingUnit by Name
async function findHandlingUnitByName(handlingUnitName) {
  try {
    const handlingUnit = await pool.query(
      `SELECT * FROM handlingUnits WHERE handlingUnitName = '${handlingUnitName}'`
    );
    res.json(newHandlingUnit.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all handlingUnits for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM handlingUnits WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`handlingUnits: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_handlingUnits_found` }, null);
    }
  );
}

// Update HandlingUnit by Id
async function updateHandlingUnitById(id, handlingUnit, result) {
  await pool.query(
    `UPDATE handlingUnits SET handlingUnitName = ? WHERE id = ?`,
    [handlingUnit.handlingUnitName, id],
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
      console.log(`updated handlingUnits: `, {
        id: id,
        handlingUnitName: handlingUnit.handlingUnitName,
      });
      result(null, { id: id, handlingUnitName: handlingUnit.handlingUnitName });
    }
  );
}

// Delete a handlingUnit by Id
async function removeHandlingUnit(id, result) {
  await pool.query(`DELETE FROM handlingUnits WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted handlingUnit with id: ${id}`);
    result(null, res);
  });
}

*/