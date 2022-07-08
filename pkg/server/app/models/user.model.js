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
  insertUser,
  selectAllUsers,
  deleteFromUsersById,
  updateUser,
};

async function insertUser({ firstName, email, lastName, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (first_name, email, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, email, lastName, hashedPassword]
    );
  } catch (err) {
    console.error("user.model " + err.message);
  }
}

//select all users from the database

async function selectAllUsers() {
  try {
    const allUsers = await pool.query("SELECT * FROM users "); //returns an array of objects
    return allUsers.rows;
  } catch (err) {
    console.error("selectAllUsers error: " + err.message);
  }
}

//put/update a user in the database

async function updateUser(id, { firstName, email, lastName, password }) {
  try {
    const newUser = await pool.query(
      "UPDATE users SET first_name = $1, email = $2, last_name = $3, password = $4 WHERE id = $5 RETURNING *",
      [firstName, email, lastName, password, id]
    );
    return newUser.rows[0];
  } catch (err) {
    console.error("putUser error: " + err.message);
  }
}

//delete a user from the database

async function deleteFromUsersById(id) {
  try {
    const deletedUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    return deletedUser.rows;
  } catch (err) {
    console.error("deleteUser error: " + err.message);
  }
}

/*
// Find a single user by Name
async function findUserByName(userName) {
  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE userName = '${userName}'`
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}

// Find all users for a single user
async function getByUserId(userId, result) {
  await pool.query(
    `SELECT * FROM users WHERE users_id = '${userId}'`,
    (err, res) => {
      if (err) {
        console.log(`error: `, err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log(`users: `, res);
        result(null, res);
        return;
      }
      result({ kind: `no_users_found` }, null);
    }
  );
}

// Update User by Id
async function updateUserById(id, user, result) {
  await pool.query(
    `UPDATE users SET userName = ? WHERE id = ?`,
    [user.userName, id],
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
      console.log(`updated users: `, {
        id: id,
        userName: user.userName,
      });
      result(null, { id: id, userName: user.userName });
    }
  );
}

// Delete a user by Id
async function removeUser(id, result) {
  await pool.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log(`error: `, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: `not_found` }, null);
      return;
    }
    console.log(`deleted user with id: ${id}`);
    result(null, res);
  });
}

*/