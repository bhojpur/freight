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

require("dotenv").config();

let databaseHost;
let databaseUser;
let databasePassword;
let databaseName;

if (process.env.NODE_ENV === "test") {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB_TEST;
} else if (process.env.NODE_ENV === "build") {
  databaseHost = process.env.DB_HOST_BUILD;
  databaseUser = process.env.DB_USER_BUILD;
  databasePassword = process.env.DB_PASSWORD_BUILD;
  databaseName = process.env.DB;
} else {
  databaseHost = process.env.DB_HOST_DEV;
  databaseUser = process.env.DB_USER_DEV;
  databasePassword = process.env.DB_PASSWORD_DEV;
  databaseName = process.env.DB;
}

module.exports = { databaseHost, databaseUser, databasePassword, databaseName };