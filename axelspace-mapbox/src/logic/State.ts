import { Place, Tag } from "./place"

export type {
    State,
}
export {
    initState,
    getPlaces,
    getTags,
//    deactivateTag,
    toggleTag,
    selectPlace,
    getActiveTags,
    incSelectedPlace,
    decSelectedPlace,
    getPlace,
	updateSortingMethod,
}

type SortingMethod = "none" | "alphabetical" | "chronological";

type State = {
    origPlaces: Place[];
    tags: Tag[];
    selectedPlaceIndex?: number;
	sortingMethod: SortingMethod;
}

function initState(places: Partial<Place>[]): State {
    const origPlaces = places.map((place, placeIndex) => {
        return Object.assign({}, place, { id: placeIndex });
    }) as Place[];

    //get all of the tags from the json data, put them into a set to remove
    //duplicates, and then use the spread operator to turn the set into
    //a normal list, for filtering
    //defaults them to an inactive state
    const tags = [...new Set(places.map(place => place.tags).flat())]
        .map(tagName => {
            return {
                name: tagName,
                active: false,
            }
        }) as Tag[];

    return {
        origPlaces,
        tags,
        selectedPlaceIndex: origPlaces.length === 0 ? undefined : origPlaces[0].id,
		sortingMethod: "none",
    }
}

function getPlaces(state: State): Place[] {
    const activeTags = getActiveTags(state).map(t => t.name);
    const availablePlaces = [...state.origPlaces].filter(place => {
        const placeTags = place.tags;
        //an item is filtered out if it fails to contain even one of the currently active filtering tags
        //in that case, the number of active tags after the filter will not match the original number of active tags
        //and the place will be filtered out
        //this is so that places are filtered out if they fail to have ALL the active tags
        return activeTags.filter(activeTag => placeTags.find(pt => pt === activeTag)).length === activeTags.length;
    });

	if (state.sortingMethod === "alphabetical") {
		availablePlaces.sort((a, b) => a.name.localeCompare(b.name, 'en'));
	} else if (state.sortingMethod === "chronological") {
		availablePlaces.sort((a, b) => a.years[0] - b.years[0]);
	} else {
	}

	return availablePlaces;
}

function getTags(state: State): Tag[] {
    return state.tags;
}

function getActiveTags(state: State): Tag[] {
    return getTags(state).filter(tag => tag.active);
}

function toggleTag(state: State, tagName: string): State {
    const newTags = state.tags.map(tag => {
        if (tag.name === tagName) {
            return {
                name: tagName,
                active: !tag.active
            }
        } else {
            return tag;
        }
    });
    const nextState = Object.assign({}, state, { tags: newTags });
    const isPlaceStillVisible = nextState.selectedPlaceIndex !== undefined && getPlace(nextState, nextState.selectedPlaceIndex) !== undefined;
    if (!isPlaceStillVisible) {
        const visiblePlaces = getPlaces(nextState);
        if (visiblePlaces.length === 0) {
            nextState.selectedPlaceIndex = undefined;
        } else {
            nextState.selectedPlaceIndex = 0;
        }
    }
    return nextState;
}

//function deactivateTag(state: State, tagName: string): State {
//    const newTags = state.tags.map(tag => {
//        if (tag.name === tagName) {
//            return {
//                name: tagName,
//                active: false
//            }
//        } else {
//            return tag;
//        }
//    });
//
//    return Object.assign({}, state, {tags: newTags});
//}

function selectPlace(state: State, nextPlaceIndex: number): State {
    const newState = Object.assign({}, state, {selectedPlaceIndex: nextPlaceIndex});
    return newState;
}

function incSelectedPlace(state: State): State {
    if (state.selectedPlaceIndex === undefined) return state;
    const nextPlace = getPlace(state, state.selectedPlaceIndex + 1);
    if (nextPlace === undefined) return state;
    return selectPlace(state, state.selectedPlaceIndex + 1);
}

function decSelectedPlace(state: State): State {
    if (state.selectedPlaceIndex === undefined) return state;
    const nextPlace = getPlace(state, state.selectedPlaceIndex - 1);
    if (nextPlace === undefined) return state;
    return selectPlace(state, state.selectedPlaceIndex - 1);
}

function getPlace(state: State, id: number): Place | undefined {
    return getPlaces(state)[id];
}

function updateSortingMethod(state: State, sortingMethod: SortingMethod): State {
	return Object.assign({}, state, { sortingMethod });
}
