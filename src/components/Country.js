import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const Country = ({countryForm}) => {
  const [listCountries, setListCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      setListCountries(await loadListCountries());
    };
    loadCountries();
  }, []);

  const loadListCountries = async () => {
    try {
      const data = await axios.get("https://covid19.mathdro.id/api/countries");
      const list = data.data.countries.map((country) => country.name);
      return list;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form.Group>
        <Form.Label>Choose a country:</Form.Label>
        <Form.Control as="select" onChange={(e) => countryForm(e.target.value)}>
          <option value="world">World</option>
          {listCountries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default Country;
