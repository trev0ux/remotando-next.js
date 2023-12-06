"use client";
import { React, useContext, useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import InputText from "../../atoms/inputText";
import InputRadio from "../../atoms/inputRadio";
import Search from "../../molecules/search";
import "./add-place-modal.scss";
import PlaceContext from "../../../PlaceContext";
import dynamic from "next/dynamic";

const OpenStreetMap = dynamic(() => import("../../molecules/map/index"), {
  ssr: false,
});

const sockets = [
  { id: 1, name: "Nenhuma", value: "none" },
  { id: 2, name: "Algumas", value: "some" },
  { id: 3, name: "Muitas", value: "many" },
];

const placesTypeArray = [
  { id: 1, name: "Cafeteria", value: "cafeteria" },
  { id: 2, name: "Livraria", value: "livraria" },
  { id: 3, name: "Coworking", value: "coworking" },
  { id: 4, name: "Hotel", value: "hotel" },
  { id: 5, name: "Restaurante", value: "restaurante" },
  { id: 6, name: "Outro", value: "outro" },
];

const hasWifi = [
  { id: 1, name: "Sim", value: "yes" },
  { id: 2, name: "Não", value: "no" },
];

const hasNoise = [
  { id: 1, name: "Sim, bastante", value: "yes" },
  { id: 2, name: "Tolerável", value: "tolerable" },
  { id: 3, name: "Não", value: "no" },
];

const spaceFree = [
  { id: 1, name: "Sim", value: "yes" },
  { id: 2, name: "Sim, mas precisa consumir", value: "yes-only-customers" },
  { id: 3, name: "Não", value: "no" },
];

function AddPlaceModal({ show, handleClose, setShow }) {
  const { addPlaces } = useContext(PlaceContext);
  const [type, setType] = useState("cafeteria");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [socket, setSocket] = useState("some");
  const [wifi, setWifi] = useState("yes-free");
  const [wifiPassword, setWifiPassword] = useState("yes-free");
  const [space, setSpace] = useState("yes");
  const [image, setImage] = useState(null);
  const [noise, setNoise] = useState([]);
  const [placeValue, setPlaceValue] = useState([]);
  const [location, setLocation] = useState(null);

  const handleFileChange = (event) => {
    const fileSelected = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (fileSelected && allowedTypes.includes(fileSelected.type)) {
      setImage(fileSelected);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const place = {
      name: name,
      type: type,
      website: website,
      instagram: instagram,
      socket: socket,
      wifi: wifi,
      space: space,
      noise: noise,
      image: image,
      wifiPassword: wifiPassword,
    };
    addPlaces(place);
    setType("");
    setName("");
    setWebsite("");
    setSocket("");
    setWifi("");
    setSpace("");
    setImage(null);
    setNoise("");
    setWifiPassword("");
    setShow(false);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar um lugar</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col className="add-place-modal__form">
                <Form.Group>
                  <div className="add-place-modal__search">
                    <Search onSelect={setLocation} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <InputText
                    label="Nome"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Selecione a melhor foto do estabelecimento
                  </Form.Label>
                  <Form.Control
                    id="file-input"
                    type="file"
                    label="Escolha um arquivo"
                    onChange={handleFileChange}
                  />
                  {image && (
                    <img
                      className="w-100"
                      src={URL.createObjectURL(image)}
                      alt="placeImage"
                    />
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tipo de estabelecimento</Form.Label>
                  <Form.Select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    {placesTypeArray.map((place) => (
                      <option key={place.id} value={place.value}>
                        {place.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <InputText
                    label="Website"
                    type="text"
                    placeholder="www.exemplo.com"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <InputText
                    label="Instagram"
                    type="text"
                    placeholder="@"
                    value={instagram}
                    onChange={(event) => setInstagram(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Tem tomadas?</Form.Label>
                  {sockets.map((socketItem) => (
                    <InputRadio
                      type="radio"
                      label={socketItem.name}
                      onChange={() => setSocket(socketItem.name)}
                      value={socketItem.value}
                      key={socketItem.id}
                      name="socket"
                      id={`socket-radio-${socketItem.id}`}
                      aria-label={socketItem.name}
                    />
                  ))}
                </Form.Group>
                <Form.Group>
                  <legend>Tem ruído no ambiente?</legend>
                  {hasNoise.map((noiseItem) => (
                    <InputRadio
                      key={noiseItem.id}
                      type="radio" // Use "radio" for radio buttons
                      label={noiseItem.name}
                      onChange={() => setNoise(noiseItem.name, noiseItem.value)}
                      value={noiseItem.value}
                      id={`noise-${noiseItem.id}`}
                      name="noise"
                      ariaLabel={noiseItem.name}
                    />
                  ))}
                </Form.Group>
                <Form.Group>
                  <legend>Tem wifi?</legend>
                  {hasWifi.map((wifiItem) => (
                    <InputRadio
                      type="radio"
                      name="wifi"
                      label={wifiItem.name}
                      key={wifiItem.id}
                      onChange={() => setWifi(wifiItem.value)}
                      value={wifiItem.value}
                      id={`wifi-radio-${wifiItem.id}`}
                      aria-label={wifiItem.name}
                    />
                  ))}
                  {wifi === "yes" ? (
                    <>
                      <InputText
                        label="Senha"
                        type="text"
                        placeholder="Informe a senha"
                        onChange={(event) =>
                          setWifiPassword(event.target.value)
                        }
                        value={wifiPassword}
                      />
                    </>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>O espaço é gratuito?</Form.Label>
                  {spaceFree.map((spaceItem) => (
                    <InputRadio
                      type="radio"
                      name="space"
                      label={spaceItem.name}
                      onChange={() => setSpace(spaceItem.name)}
                      value={spaceItem.value}
                      key={spaceItem.id}
                      id={`space-radio-${spaceItem.id}`}
                      aria-label={spaceItem.name}
                    />
                  ))}
                  {space === "Sim" ? (
                    <>
                      <InputText
                        label="Valor"
                        type="text"
                        placeholder="Informe o valor"
                        onChange={(event) => setPlaceValue(event.target.value)}
                        value={placeValue}
                      />
                    </>
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <OpenStreetMap location={location} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddPlaceModal;
