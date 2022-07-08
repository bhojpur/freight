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

const toCamel = (str) => {
    return str.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };
  
  const isObject = function (obj) {
    return (
      obj === Object(obj) &&
      !Array.isArray(obj) &&
      typeof obj !== "function" &&
      !(obj instanceof Date)
    );
  };
  
  function keysToCamel(obj) {
    if (isObject(obj)) {
      const n = {};
  
      Object.keys(obj).forEach((k) => {
        //if key is 'date' and value is a date object, convert it to a string
        if (obj[k] instanceof Date) {
          n[k] = obj[k].toLocaleDateString();
        } else {
          n[toCamel(k)] = keysToCamel(obj[k]);
        }
      });
  
      return n;
    } else if (Array.isArray(obj)) {
      return obj.map((i) => {
        return keysToCamel(i);
      });
    }
  
    return obj;
  }
  
  module.exports = { keysToCamel };