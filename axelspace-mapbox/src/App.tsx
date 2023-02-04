import { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import data from "../src/assets/data/places.json";

import './App.css'
import { Story } from './components/Story';
import { activateTag, getPlaces, getTags, initState, selectPlace, State } from './logic/State';
import Button from '@mui/material/Button/Button';
import { GpsInfo } from './components/GpsInfo';

//specify VITE_MAPBOX_TOKEN in the .env file
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function App() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	const [state, setState] = useState<State>(initState(data.places));

	useEffect(() => {
		return;
		if (map.current !== null) return; // initialize map only once
		if (mapContainer.current !== null) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [lng, lat],
				zoom: zoom
			});
		}
	}, []);
	return (
		<div className="App">
			<div className="map-container">
				<GpsInfo
					longitude={lng}
					latitude={lat}
					zoom={zoom}
					nextDisabled={false}
					prevDisabled={false}
				></GpsInfo>
				<div id="map" className="map" ref={mapContainer}>
				</div>
			</div>
			<Story
				places={getPlaces(state)}
				tags={getTags(state)}
				onSelectPlace={(id: number) => setState(selectPlace(state, id))}
				activePlaceIndex={state.selectedPlace}
			></Story>
		</div>
	)
}
export default App
