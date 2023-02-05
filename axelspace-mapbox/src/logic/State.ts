import { Place, Tag } from "./place"

export type {
    State,
}
export {
    initState,
    getPlaces,
    getTags,
    deactivateTag,
    activateTag,
    selectPlace,
    getActiveTags,
    incSelectedPlace,
    decSelectedPlace,
    getPlace,
}

type State = {
    origPlaces: Place[];
    tags: Tag[];
    selectedPlaceId?: number;
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
        selectedPlaceId: origPlaces.length === 0 ? undefined : origPlaces[0].id,
    }
}

function getPlaces(state: State): Place[] {
    const activeTags = new Set(getActiveTags(state).map(t => t.name));
    return [...state.origPlaces].filter(place => {
        const placeTags = place.tags;
        return placeTags.filter(placeTag => !activeTags.has(placeTag)).length !== 0;
    });
}

function getTags(state: State): Tag[] {
    return state.tags;
}

function getActiveTags(state: State): Tag[] {
    return getTags(state).filter(tag => tag.active);
}

function activateTag(state: State, tagName: string): State {
    const newTags = state.tags.map(tag => {
        if (tag.name === tagName) {
            return {
                name: tagName,
                active: true
            }
        } else {
            return tag;
        }
    });
    return Object.assign({}, state, { tags: newTags });
}

function deactivateTag(state: State, tagName: string): State {
    const newTags = state.tags.map(tag => {
        if (tag.name === tagName) {
            return {
                name: tagName,
                active: false
            }
        } else {
            return tag;
        }
    });

    return Object.assign({}, state, {tags: newTags});
}

function selectPlace(state: State, placeId: number): State {
    const newState = Object.assign({}, state, {selectedPlaceId: placeId});
    console.log(newState);
    return newState;
}

function incSelectedPlace(state: State): State {
    if (state.selectedPlaceId === undefined) return state;
    if (state.selectedPlaceId + 1 >= state.origPlaces.length) return state;
    return selectPlace(state, state.selectedPlaceId + 1);
}

function decSelectedPlace(state: State): State {
    if (state.selectedPlaceId === undefined) return state;
    if (state.selectedPlaceId - 1 < 0) return state;
    return selectPlace(state, state.selectedPlaceId - 1);
}

function getPlace(state: State, id: number): Place | undefined {
    return state.origPlaces.find(place => place.id === id);
}
