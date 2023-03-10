import { useEffect, useRef, useState } from 'react'
import mapboxgl from "mapbox-gl";

import data from "../src/assets/data/places.json";

import './App.css'
import { Story } from './components/Story';
import { toggleTag, decSelectedPlace, getPlace, getPlaces, getTags, incSelectedPlace, initState, selectPlace, State, updateSortingMethod } from './logic/State';
import { GpsInfo } from './components/GpsInfo';
import { Button } from '@mui/material';

//specify VITE_MAPBOX_TOKEN in the .env file
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

const defaultZoom = 13;

function App() {
	const mapContainer = useRef(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [center, setCenter] = useState<[number, number]>([-70.9, 42.35])
	const [zoom, setZoom] = useState(defaultZoom);

	//can print the current application state to a text area
	//on the map screen by setting the variable VITE_DEBUG_STATE
	//to be true in the axelspace-mapbox/.env file
	const debugState = import.meta.env.VITE_DEBUG_STATE;

	const [state, setState] = useState<State>(initState(data.places));

	const isNextButtonDisabled = () => {
		if (state.selectedPlaceIndex === undefined) return true;
		const visablePlaces = getPlaces(state);
		const nextVisablePlace = getPlace(state, state.selectedPlaceIndex + 1);
		return state.selectedPlaceIndex === undefined || visablePlaces.length === 0 || nextVisablePlace === undefined;
	}

	const isPrevButtonDisabled = () => {
		if (state.selectedPlaceIndex === undefined) return true;
		const visablePlaces = getPlaces(state);
		const nextVisablePlace = getPlace(state, state.selectedPlaceIndex - 1);
		return state.selectedPlaceIndex === undefined || visablePlaces.length === 0 || nextVisablePlace === undefined;
	}

	//when the selected place id is updated, update the state variables
	//for longitude, latitude and zoom to match the new location
	useEffect(() => {
		if (state.selectedPlaceIndex === undefined) return;
		console.log(`new selected place id:${state.selectedPlaceIndex}`);
		const newPlace = getPlace(state, state.selectedPlaceIndex);
		console.log(newPlace);
		if (newPlace !== undefined && map.current !== null) {
			setCenter([newPlace.longitude, newPlace.latitude]);
			setZoom(defaultZoom);
		}
	}, [state.selectedPlaceIndex, state.tags]);

	//when the longitude or latitude changes, propogate that change
	//to the mapbox object
	useEffect(() => {
		if (map.current !== null) {
			map.current.setCenter(center);
		}
	}, center);

	//initialize the mapbox object with the reference to it's container
	//DOM element
	useEffect(() => {
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

	//useEffect(() => {
	//	console.log('on move');
	//	if (map.current === null) return; // wait for map to initialize
	//	console.log('map not null');
	//	map.current.on('move', () => {
	//		if (map.current === null) return;
	//		const longitude = Number.parseFloat(map.current.getCenter().lng.toFixed(4));
	//		const latitude = Number.parseFloat(map.current.getCenter().lat.toFixed(4));
	//		setCenter([longitude, latitude]);
	//		setZoom(Number.parseFloat(map.current.getZoom().toFixed(2)));
	//	});
	//});

	const sortAlphabeticalButton = () => {
		return (
			<Button
				variant={state.sortingMethod === "alphabetical" ? "outlined" : "contained"}
				onClick={() => setState(updateSortingMethod(state, "alphabetical"))}
			>ABC</Button>
		);
	}
	const sortChronologicalButton = () => {
		return (
			<Button
				variant={state.sortingMethod === "chronological" ? "outlined" : "contained"}
				onClick={() => setState(updateSortingMethod(state, "chronological"))}
				>DATE</Button>
		);
	}
	return (
		<div className="App">
			<div className="map-container">
				<div id="map" className="map" ref={mapContainer}>
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
				activePlaceIndex={state.selectedPlaceIndex}
				onSelectTag={(name: string) => setState(toggleTag(state, name))}
				sortingButtons={[
					sortAlphabeticalButton(),
					sortChronologicalButton(),
				]}
			></Story>
			{debugState && <textarea style={{position: "absolute", top: 0, minHeight: "300px", minWidth: "400px"}}value={JSON.stringify(state)}></textarea>}
		</div>
	)
}
export default App
