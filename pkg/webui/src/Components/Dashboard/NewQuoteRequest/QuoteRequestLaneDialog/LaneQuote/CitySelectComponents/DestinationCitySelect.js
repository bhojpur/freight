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

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function DestinationCitySelect({
  cities,
  handleInputChange,
  destinationIDs,
  setDestinationIDs,
  setLaneStops,
  index,
}) {
  const onCityChange = (event, values) => {
    setInputValue(`${values.name}, ${values.stateProvinceName}`);
    const destinationCityId = values.id;

    const inputList = [...destinationIDs];
    inputList[index].cityId = destinationCityId;
    inputList[index].isOrigin = false;
    inputList[index].cityName = values.name;
    inputList[index].stateProvinceName = values.stateProvinceName;
    inputList[index].stateProvinceId = values.stateProvinceId;
    setDestinationIDs(inputList);
    setLaneStops({
      destinations: destinationIDs,
    });
  };

  const [inputValue, setInputValue] = React.useState("");
  function onInputChange(e) {
    if (e != null) {
      setInputValue(e.target.value);
    }
  }
  return (
    <Autocomplete
      freeSolo
      inputValue={inputValue}
      onInputChange={onInputChange}
      id="combo-box-demo"
      key={cities.id}
      options={cities}
      style={{ width: 300 }}
      onChange={onCityChange}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name} , {option.stateProvinceName}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Start Typing Destination"
          variant="outlined"
        />
      )}
      open={inputValue.length > 2}
    />
  );
}

// get the city data from the backend