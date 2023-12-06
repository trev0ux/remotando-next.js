import { useState, useEffect } from "react";
import "./search-template.scss";
import { Container, Form, Button } from "react-bootstrap";
import SearchIcon from "../../../assets/icons/search.svg";
import InputText from "../../atoms/inputText";
// import WaveIcon from "../../../assets/icons/wave.svg";
// import Sun from "../../../assets/images/sun.png";
import Card from "../../molecules/card";

export default function SearchTemplate({ places }) {
  const [searchPlace, setSearchPlace] = useState("");
  const [filteredList, setFilteredList] = useState([...places]);

  const filteredPlaces = () => {
      const filtered = places.filter((item) =>
        item.name.toLowerCase().includes(searchPlace.toLowerCase())
      );
      setFilteredList(filtered);
  };

  const filterWifi = (wifiStatus) => {
    if (wifiStatus === "no") {
      setFilteredList([...places]);
    } else {
      const filtered = places.filter((item) => item.wifi === wifiStatus);
      setFilteredList(filtered);
    }
  };

  useEffect(() => {
    filterWifi();
    filteredPlaces();
  }, [searchPlace]);

  return (
    <section className="search-template">
      <Container>
        <div className="search-template__grey-background">
          {/* <Sun />
          <WaveIcon /> */}
          <p>Encontre lugares para trabalhar remotamente em Salvador</p>
          <div className="search-template__search-field">
            <Button aria-label="Pesquisar">
              Pesquisar
              <SearchIcon />
            </Button>
            <InputText
              type="text"
              placeholder="Procure lugares"
              value={searchPlace}
              onChange={(e) => {
                setSearchPlace(e.target.value);
              }}
            />
          </div>
          {/* <WaveIcon /> */}
        </div>
        <div className="search-template__filters">
          <Form.Check
            type="switch"
            id={`custom-switch-1`}
            label="Wi-fi"
            onChange={(e) => filterWifi(e.target.checked ? "yes" : "no")}
          />
          <Form.Check type="switch" id={`custom-switch-2`} label="Notas" />
          <Form.Check type="switch" id={`custom-switch-3`} label="Distância" />
        </div>
        <section className="search-template__card-listing">
          {filteredList.map((place, index) => (
            <Card
              key={`place-${index}`}
              name={place.name}
              type={place.type}
              website={place.website}
              instagram={place.instagram}
              socket={place.socket}
              wifi={place.wifi}
              wifiPassword={place.wifiPassword}
              space={place.space}
              noise={place.noise}
              image={place.image}
            />
          ))}
        </section>
      </Container>
    </section>
  );
}
