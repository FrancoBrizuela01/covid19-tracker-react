import React from "react";
import CountUp from "react-countup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "../style.css";

const Cards = ({ data }) => {
  if (!data.data) {
    return "...charging";
  } else {
    return (
      <div>
        <Row>
          <Card>
            <Card.Body className="cardInfected">
              <Card.Title>Number of infected</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.confirmed.value}
                  duration={3}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="cardBodyCount">
              <Card.Title>Body count</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.deaths.value}
                  duration={3}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="cardRecovered">
              <Card.Title>Number of recovered</Card.Title>
              <Card.Text>
                <CountUp
                  start={0}
                  end={data.data.recovered.value}
                  duration={3}
                  separator="."
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
};

export default Cards;
