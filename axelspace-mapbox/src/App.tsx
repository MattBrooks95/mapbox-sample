import { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import data from "../src/assets/data/places.json";

import './App.css'
import { Story } from './components/Story';
import { activateTag, decSelectedPlace, getPlace, getPlaces, getTags, incSelectedPlace, initState, selectPlace, State } from './logic/State';
import { GpsInfo } from './components/GpsInfo';

//specify VITE_MAPBOX_TOKEN in the .env file
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

function App() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [center, setCenter] = useState<[number, number]>([-70.9, 42.35])
	const [zoom, setZoom] = useState(9);

	const debugState = true;

	const [state, setState] = useState<State>(initState(data.places));

	const isNextButtonDisabled = () => {
		return state.selectedPlaceId === undefined || state.origPlaces.length === 0 || state.selectedPlaceId >= state.origPlaces.length - 1;
	}

	const isPrevButtonDisabled = () => {
		return state.selectedPlaceId === undefined || state.origPlaces.length === 0 || state.selectedPlaceId === 0;
	}

	useEffect(() => {
		if (state.selectedPlaceId === undefined) return;
		console.log(`new selected place id:${state.selectedPlaceId}`);
		const newPlace = getPlace(state, state.selectedPlaceId);
		console.log(newPlace);
		if (newPlace !== undefined && map.current !== null) {
			setCenter([newPlace.longitude, newPlace.latitude]);
		}
	}, [state.selectedPlaceId]);

	useEffect(() => {
		if (map.current !== null) {
			map.current.setCenter(center);
		}
	}, center);

	useEffect(() => {
		//return;
		if (map.current !== null) return; // initialize map only once
		if (mapContainer.current !== null) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center,
				zoom: zoom
			});
		}
	}, []);
	return (
		<div className="App">
			<div className="map-container">
co				<div id="map" className="map" ref={mapContainer}>
				</div>
			</div>
			<GpsInfo
				longitude={center[0]}
				latitude={center[1]}
				zoom={zoom}
				nextDisabled={isNextButtonDisabled()}
				prevDisabled={isPrevButtonDisabled()}
				onNext={() => setState(incSelectedPlace(state))}
				onPrev={() => setState(decSelectedPlace(state))}
			></GpsInfo>
			<Story
				places={getPlaces(state)}
				tags={getTags(state)}
				onSelectPlace={(id: number) => setState(selectPlace(state, id))}
				activePlaceIndex={state.selectedPlaceId}
			></Story>
			{debugState && <textarea style={{position: "absolute", top: 0, minHeight: "300px", minWidth: "400px"}}value={JSON.stringify(state)}></textarea>}
		</div>
	)
}
export default App
