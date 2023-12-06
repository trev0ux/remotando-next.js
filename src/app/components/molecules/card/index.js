import "./card.scss";
import LinkIcon from "../../../assets/icons/link.svg";
import Pin from "../../../assets/icons/map-pin.svg";
import Socket from "../../../assets/icons/tomadas.svg";
import Clock from "../../../assets/icons/clock.svg";
import Wifi from "../../../assets/icons/wifi.svg";
import Lock from "../../../assets/icons/lock.svg";
import Instagram from "../../../assets/icons/instagram.svg";
import Noise from "../../../assets/icons/noise.svg";
import NoNoise from "../../../assets/icons/no-noise.svg";

function Card({
  name,
  type,
  website,
  instagram,
  socket,
  wifi,
  space,
  noise,
  image,
  wifiPassword,
}) {
  return (
    <div className="card">
      {image && (
        <img
          className="w-100"
          src={URL.createObjectURL(image)}
          alt="placeImage"
        />
      )}
      <h3>{name}</h3>
      <ul className="card__places">
        <li>Shopping Barra</li>
        <li>5km</li>
        <li>{type}</li>
      </ul>
      <div>
        <ul className="card__itens">
          {website && (
            <li>
              <a href={website}>
                <LinkIcon />
                Website
              </a>
            </li>
          )}

          {instagram && (
            <li>
              <a href={instagram}>
                <Instagram />
                Instagram
              </a>
            </li>
          )}
          <li>
            <Socket />
            {socket}
          </li>
          <li>
            <Wifi /> {wifi}
          </li>
          <li>
            {noise === "yes" || noise === "tolerable" ? <Noise /> : <NoNoise />}{" "}
            {noise}
          </li>
        </ul>
        <Pin />
      </div>
      <div className="card__footer">
        <p>
          <Clock /> Aberto hoje 8:00 - 17:00
        </p>
      </div>
      {wifi === "Sim" ? (
        <div className="card__footer">
          <p>
            <Lock /> {wifiPassword}
          </p>
          <button type="button">Copiar</button>
        </div>
      ) : null}
    </div>
  );
}

export default Card;
