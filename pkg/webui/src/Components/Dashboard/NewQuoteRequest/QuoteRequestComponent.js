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
import CustomerQuoteDialog from "./QuoteRequestCustomerDialog/CustomerQuoteDialog";
import { useState } from "react";
import LaneQuoteDialog from "./QuoteRequestLaneDialog/LaneQuoteDialog";
import LoadQuoteDialog from "./QuoteRequestLoadDialog/LoadQuoteDialog";

import { useEffect } from "react";

export default function QuoteRequestDialog({
  handleQuoteRequestClose,
  quoteRequestDialogOpen,
  setQuoteRequestOpen,
  onSubmit,
  handleSubmit,
}) {
  const [quoteRequestObject, setQuoteRequestObject] = useState({});
  const [cities, setCities] = useState([]);

  async function getCities() {
    try {
      const response = await fetch("http://localhost:5000/cities");
      const jsonData = await response.json();

      setCities(jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCities();
  }, []);

  function getFormData(e) {
    setQuoteRequestObject((prevState) => {
      // Object.assign would also work
      return { ...prevState, ...e };
    });
  }

  const [customerQuoteDialogOpen, setCustomerQuoteDialogOpen] = useState(false);

  const handleCustomerQuoteDialogOpen = () => {
    setCustomerQuoteDialogOpen(true);
  };

  const handleCustomerQuoteDialogClose = () => {
    setCustomerQuoteDialogOpen(false);
    setQuoteRequestOpen(false);
  };

  const [laneQuoteDialogOpen, setLaneQuoteDialogOpen] = useState(false);

  const handleLaneQuoteDialogOpen = () => {
    setLaneQuoteDialogOpen(true);
  };

  const handleLaneQuoteDialogClose = () => {
    setLaneQuoteDialogOpen(false);
  };

  const [loadQuoteDialogOpen, setLoadQuoteDialogOpen] = useState(false);

  const handleLoadQuoteDialogOpen = () => {
    setLoadQuoteDialogOpen(true);
  };

  const handleLoadQuoteDialogClose = () => {
    setLoadQuoteDialogOpen(false);
  };

  const handleSubmitLoadQuoteDialogClose = () => {
    setLoadQuoteDialogOpen(false);
    //pass back to Dashboard
    handleSubmit(onSubmit(quoteRequestObject));
    setQuoteRequestObject({});
  };

  function CustomerQuoteDialogNext() {
    handleCustomerQuoteDialogClose();
    handleLaneQuoteDialogOpen();
  }

  function LaneQuoteDialogNext() {
    handleLaneQuoteDialogClose();
    handleLoadQuoteDialogOpen();
  }

  function LaneQuoteDialogBack() {
    handleLaneQuoteDialogClose();
    handleCustomerQuoteDialogOpen();
  }

  function LoadQuoteDialogBack() {
    handleLoadQuoteDialogClose();
    handleLaneQuoteDialogOpen();
  }

  return (
    <>
      <p>{JSON.stringify(quoteRequestObject)} </p>
      <CustomerQuoteDialog
        handleCustomerQuoteDialogClose={handleCustomerQuoteDialogClose}
        customerQuoteDialogOpen={
          quoteRequestDialogOpen || customerQuoteDialogOpen
        }
        next={CustomerQuoteDialogNext}
        getFormData={getFormData}
      />
      <LaneQuoteDialog
        handleLaneQuoteDialogClose={handleLaneQuoteDialogClose}
        handleLaneQuoteDialogOpen={handleLaneQuoteDialogOpen}
        laneQuoteDialogOpen={laneQuoteDialogOpen}
        cities={cities}
        next={LaneQuoteDialogNext}
        prev={LaneQuoteDialogBack}
        getFormData={getFormData}
      />
      <LoadQuoteDialog
        handleLoadQuoteDialogClose={handleLoadQuoteDialogClose}
        handleLoadQuoteDialogOpen={handleLoadQuoteDialogOpen}
        loadQuoteDialogOpen={loadQuoteDialogOpen}
        prev={LoadQuoteDialogBack}
        getFormData={getFormData}
        handleSubmitLoadQuoteDialogClose={handleSubmitLoadQuoteDialogClose}
      />
    </>
  );
}