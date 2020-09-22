import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../styles/TinderCards.css";
import axios from "../axios";

function TinderCards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get("/tinder/card");
      setPeople(req.data);
    };

    fetchData();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("Removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
          >
            <div
              className="card"
              style={{ backgroundImage: "url(" + person.image + ")" }}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
export default TinderCards;
