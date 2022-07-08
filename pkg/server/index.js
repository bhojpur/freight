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

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const offersAPI = require("./app/routes/offer.routes");
const citiesAPI = require("./app/routes/city.routes");
const lane_stopsAPI = require("./app/routes/laneStop.routes");
const customersAPI = require("./app/routes/customer.routes");
const carriersAPI = require("./app/routes/carrier.routes");
const quoteRequestsAPI = require("./app/routes/quoteRequest.routes");
const handling_unitsAPI = require("./app/routes/handlingUnit.routes");

const refreshTokenAPI = require("./app/routes/token.routes");
const userAPI = require("./app/routes/user.routes");
const loginAPI = require("./app/routes/login.routes");

//middleware
app.use(cors());
app.use(express.json());

const refreshTokens = [];

offersAPI(app);
citiesAPI(app);
lane_stopsAPI(app);
customersAPI(app);
carriersAPI(app);
quoteRequestsAPI(app);
handling_unitsAPI(app);

refreshTokenAPI(app, refreshTokens);
loginAPI(app, refreshTokens);

userAPI(app);

//ROUTES//

app.listen(5000, () => console.log("Bhojpur Freight server engine started at localhost:5000"));