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

const userModel = require("../models/user.model");

const insertUser = userModel.insertUser;
const selectAllUsers = userModel.selectAllUsers;
const deleteFromUsersById = userModel.deleteFromU;
const snakeToCamel = require("../utils/snakeToCamel");
const keysToCamel = snakeToCamel.keysToCamel;

module.exports = { getAllUsers, postUser, deleteUser, putUser };

async function postUser(req, res) {
  const { firstName, email, lastName, password } = req.body;
  const user = req.user;

  //create new user
  const newUser = await insertUser({
    firstName,
    email,
    lastName,
    password,
  });
  //send response
  const camelUser = keysToCamel(newUser);
  res.json(camelUser);
}

//get all users
async function getAllUsers(req, res) {
  try {
    const allUsers = await selectAllUsers();
    const allUsersCamelCase = allUsers.map((user) => {
      return keysToCamel(user);
    });

    res.json(allUsersCamelCase);
  } catch (error) {
    console.log(error);
  }
}

//delete a user
async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedUser = await deleteFromUsersById(id);
  const deletedUserCamelCase = keysToCamel(deletedUser);
  res.json(deletedUserCamelCase);
}

//update a user

async function putUser(req, res) {
  const { id } = req.params;
  const { firstName, email, lastName, password } = req.body;
  const updatedUser = await updateUser(id, {
    firstName,
    email,
    lastName,
    password,
  });
  const updatedUserCamelCase = keysToCamel(updatedUser);
  res.json(updatedUserCamelCase);
}