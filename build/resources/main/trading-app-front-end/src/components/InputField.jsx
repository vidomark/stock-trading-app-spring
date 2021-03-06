import React, { useEffect, useState } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import axios from "axios";

export default function InputField(props) {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockPrice, setStockPrice] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchStockData = () => {
    setIsSubmitted(true);
    const symbol = stockSymbol;
    const price = stockPrice;
    const url = `http://localhost:8080/?symbol=${symbol}&price=${price}`;
    axios
      .get(url)
      .then((res) => setStock(res.data))
      .then(setIsSubmitted(false));
  };

  const setStock = (data) => {
    console.log(data);
    props.setStockData(data);
  };

  useEffect(() => {
    isSubmitted && fetchStockData();
  });

  return (
    <div>
      <label htmlFor="">Enter a stock symbol (for example aapl)</label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">
            Symbol
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(event) => {
            setStockSymbol(event.target.value);
          }}
        />
      </InputGroup>

      <label htmlFor="">Enter the maximum price you are willing to pay</label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">
            Price
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(event) => {
            setStockPrice(event.target.value);
          }}
        />
      </InputGroup>

      <Button onClick={fetchStockData}>Submit</Button>
    </div>
  );
}