// import { useClient } from 'next/client';
// import { useState } from 'react';
"use client";
import Header from "./components/molecules/header";
import AddPlaceModal from "./components/organisms/add-place-modal";
import { useState } from "react";
import PlaceContext from "./PlaceContext";
import SearchTemplate from "./components/templates/search/search-template";

export default function Home() {
  const [show, setShow] = useState(false);
  const [places, setPlaces] = useState([]);

  const addPlaces = (newPlace) => {
    setPlaces([...places, newPlace]);
  };


  return (
    <PlaceContext.Provider value={{ places, addPlaces }}>
      <div className="App">
        <Header handleShow={() => setShow(true)} />
        <AddPlaceModal
          show={show}
          handleShow={() => setShow(true)}
          handleClose={() => setShow(false)}
          setShow={setShow}
        />
        <SearchTemplate places={places}/>
      </div>
    </PlaceContext.Provider>
  );
}
