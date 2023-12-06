'use client'
import { createContext } from 'react';

const PlaceContext = createContext({
    places: [],
    addPlaces: () => {},
    searchPlaces: () => {}
});

export default PlaceContext;