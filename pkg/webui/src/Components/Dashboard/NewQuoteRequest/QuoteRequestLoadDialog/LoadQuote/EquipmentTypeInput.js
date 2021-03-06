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
import { useState } from "react";
import ReactDOM from "react-dom";
import { Autocomplete } from "@mui/material";
import {
  Container,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "38ch",
    },
  },
  btn: {
    height: "55px",
    float: "right",
    marginBottom: "15px",
  },
  btn3: {
    height: "55px",
    width: "35px",
    float: "right",
  },
  btnB: {
    height: "55px",
    marginBottom: "15px",
  },
}));

export default function HandlingUnitInput({ getEquipmentData }) {
  const classes = useStyles();
  const [multiInput, setMultiInput] = useState([
    {
      equipmentType: "",
      specialAttributes: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    const inputList = [...multiInput];
    inputList[index][name] = value;
    setMultiInput(inputList);
    getEquipmentData(multiInput);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...multiInput];
    inputList.splice(index, 1);
    setMultiInput(inputList);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
    setMultiInput([
      ...multiInput,
      {
        equipmentType: "",
        specialAttributes: "",
      },
    ]);
    console.log(multiInput);
  };

  const equipmentTypes = [
    { equipmentType: "Dry Van" },
    { equipmentType: "Reefer" },
    { equipmentType: "Flatbed" },
    { equipmentType: "Super-B" },
    { equipmentType: "Curtain Side" },
  ];

  return (
    <Container>
      <Card>
        <CardHeader title="Enter Equipment Information" />
        <CardContent>
          {multiInput.map((x, i) => {
            return (
              <div className={classes.root} key={i}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={equipmentTypes.map((option) => option.equipmentType)}
                  onChange={(e, value) => {
                    const inputList = [...multiInput];
                    inputList[i].equipmentType = value;
                    setMultiInput(inputList);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      label="Equipment Type"
                      name="equipmentType"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
                <TextField
                  id="outlined-basic1"
                  label="Special Attributes"
                  name="specialAttributes"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, i)}
                />
                <p>{JSON.stringify(multiInput)}</p>
              </div>
            );
          })}

          <hr />
        </CardContent>
      </Card>
      <hr />
    </Container>
  );
}