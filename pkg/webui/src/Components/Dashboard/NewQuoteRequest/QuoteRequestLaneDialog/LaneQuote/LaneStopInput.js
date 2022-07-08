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
import OriginCitySelect from "./CitySelectComponents/OriginCitySelect";
import DestinationCitySelect from "./CitySelectComponents/DestinationCitySelect";
import { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Card,
  CardActions,
} from "@material-ui/core";

export default function LaneStopInput({ getLaneStops, cities }) {
  const [originIDs, setOriginIDs] = useState([{ cityId: "", isOrigin: true }]);
  const [destinationIDs, setDestinationIDs] = useState([
    { cityId: "", isOrigin: false },
  ]);

  const [LaneStops, setLaneStops] = useState({
    origins: originIDs,
    destinations: destinationIDs,
  });

  // handle click event of the Remove button
  const handleOriginRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...originIDs];
    inputList.splice(index, 1);
    setOriginIDs(inputList);
    setLaneStops({
      origins: originIDs,
    });
  };

  // handle click event of the Add button
  const handleOriginAddClick = (e) => {
    e.preventDefault();
    setOriginIDs([
      ...originIDs,
      {
        cityId: "",
        isOrigin: false,
      },
    ]);
    console.log(originIDs);
    setLaneStops({
      origins: originIDs,
    });
  };

  const handleDestinationRemoveClick = (e, index) => {
    e.preventDefault();
    const inputList = [...originIDs];
    inputList.splice(index, 1);
    setDestinationIDs(inputList);
    setLaneStops({
      destinations: destinationIDs,
    });
  };

  // handle click event of the Add button
  const handleDestinationAddClick = (e) => {
    e.preventDefault();
    setDestinationIDs([
      ...destinationIDs,
      {
        cityId: "",
        isOrigin: false,
      },
    ]);
    setLaneStops({
      destinations: destinationIDs,
    });
  };

  useEffect(() => {
    getLaneStops(LaneStops);
  }, [LaneStops]);

  return (
    <Container>
      <Card>
        <CardHeader title="Enter Load Information" />
        <CardContent>
          {originIDs.map((x, i) => {
            return (
              <div key={i}>
                <OriginCitySelect
                  cities={cities}
                  setOriginIDs={setOriginIDs}
                  index={i}
                  originIDs={originIDs}
                  setLaneStops={setLaneStops}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOriginAddClick}
                >
                  Add Origin
                </Button>

                {i > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleOriginRemoveClick(e, i)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
          {destinationIDs.map((x, j) => {
            return (
              <div key={j}>
                <DestinationCitySelect
                  cities={cities}
                  setDestinationIDs={setDestinationIDs}
                  index={j}
                  destinationIDs={destinationIDs}
                  setLaneStops={setLaneStops}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDestinationAddClick}
                >
                  Add Destination
                </Button>

                {j > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleDestinationRemoveClick(e, j)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Container>
  );
}