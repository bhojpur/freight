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

const loginModel = require("../models/login.model");
const bcrypt = require("bcrypt");
const accessToken = require("../auth/accessToken");
const generateAccessToken = accessToken.generateAccessToken;
const refreshToken = require("../auth/refreshToken");
const generateRefreshToken = refreshToken.generateRefreshToken;

const selectLogin = loginModel.selectLogin;

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const postLogin = (refreshTokens) => async (req, res) => {
  try {
    const { email, password } = req.body;

    //create new user
    const newUser = await selectLogin({
      email,
      password,
    });
    if (newUser.length === null) {
      return res.status(400).send("Cannot find user");
    }

    //invoke bcrypt to compare password
    verifyPassword(password, newUser[0].password).then((result) => {
      if (result) {
        //if password is correct, generate an access token and refresh token using the user email

        const user = { email: newUser[0].email, id: newUser[0].id };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        //For now, store refresh tokens in an array
        refreshTokens.push(refreshToken);

        //return access token and refresh token to client
        res.json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          userName: newUser[0].first_name + " " + newUser[0].last_name,
          userEmail: newUser[0].email,
          userId: newUser[0].id,
        });

        console.log(refreshTokens);
      } else {
        res.status(400).send("Invalid password");
      }
    });
  } catch (err) {
    console.error("postLogin error: " + err.message);
  }
};
module.exports = { postLogin };