import React, { useState, useEffect } from "react";
import axios from "axios";
import covidimg from "./images/covid.png"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

import Country from "./components/Country";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import Graphics from "./components/Graphics";


const App = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
      const loadData = async () =>{
          const apiData = await fetchData(country);
          setData(apiData);
      }
      loadData();
  }, [country]);

  console.log(data);

  const countryForm = async (country) => {
    setCountry(country);
  };

  const fetchData = async (country) => {
    let url = "";
    if (country === "" || country === "World") {
      url = "https://covid19.mathdro.id/api";
    } else {
      url = `https://covid19.mathdro.id/api/countries/${country}`;
    }

    try {
      const data = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <img src={covidimg} alt="COVID-19" />
      </div>
      <NavBar />
      <Container fluid>
        <Row>
          <Col xl={3}>
            <Country countryForm={countryForm} />
          </Col>
          <Col xl={6}>
            <Graphics country={country} data={data} />
          </Col>
          <Col xl={3}>
            <Cards data={data} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
