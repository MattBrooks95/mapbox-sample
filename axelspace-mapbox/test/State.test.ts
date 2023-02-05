import { describe, test, expect, beforeEach } from "vitest";

//note that it would be better to have another copy of this data
//that way I wouldn't have to update the tests when I update the actual data structure
//but that's a corner I'm going to cut
import data from "../src/assets/data/places.json";

import { getActiveTags, getPlaces, initState, State, toggleTag, updateSortingMethod } from "../src/logic/State";

function getState(): State {
    return initState(data.places);
}

describe("State", () => {
    test("initialize tag list", () => {
        const state = getState();
        expect(state.tags.map(x => x.name)).toEqual([
            "childhood",
            "education",
            "career",
            "adult"
        ]);
    });

    test("set a tag to be active", () => {
        const state = getState();
        expect(getActiveTags(state)).toEqual([]);

        const stateChildhood = toggleTag(state, "childhood");
        expect(getActiveTags(stateChildhood).map(t => t.name)).toEqual(["childhood"]);
        const stateCareer = toggleTag(stateChildhood,"career");
        expect(getActiveTags(stateCareer).map(t => t.name)).toEqual(["childhood", "career"]);
    });

    test("set a tag to be inactive", () => {
        const state = getState();
        const testTag = "childhood";
        const withActiveTag = toggleTag(state, testTag);
        expect(getActiveTags(withActiveTag).map(t => t.name)).toEqual([testTag]);
        const noActiveTags = toggleTag(withActiveTag, testTag);
        expect(getActiveTags(noActiveTags).map(t => t.name)).toEqual([]);
    });

    test("tags filter places, one tag", () => {
        let state = getState();
        expect(getPlaces(state).map(place => place.id).length).toBe(state.origPlaces.length);
        //add a tag
        state = toggleTag(state, "childhood");
        //childhood tag should filter the list to only include the first two locations
        expect(getPlaces(state).map(place => place.name)).toEqual(["Lancaster, OH", "Logan, OH"]);
    });

    test("tags filter places, several tags", () => {
        let state = getState();
	    expect(getPlaces(state).map(place => place.id).length).toBe(state.origPlaces.length);
        state = toggleTag(state, "education");
        //add the education tag, to filter the list to include only places where I was going to school
        expect(getPlaces(state).map(place => place.name)).toEqual(["Logan, OH", "Athens, OH"]);
        //add the childhood tag as well. I was not a child in college, so Athens should fall off of the list
        state = toggleTag(state, "childhood");
        expect(getPlaces(state).map(place => place.name)).toEqual(["Logan, OH"]);
    });

	describe("sort", () => {
		test("sort by year", () => {
			const initialState = sortTestInitState();
			const sortedByYear = updateSortingMethod(initialState, "chronological");
			const sortedPlaceIds = getPlaces(sortedByYear).map(place => place.id);
			const answerIds = [2, 3, 1]
			//sorted list should have the same amount of elements
			expect(sortedPlaceIds.length).toBe(answerIds.length);
			//the ids of the elements should match the sorted answer
			sortedPlaceIds.forEach((sortedId, idx) => expect(sortedId === answerIds[idx]));

		});
		test("sort by name", () => {
			const initialState = sortTestInitState();
			const sortedByName = updateSortingMethod(initialState, "alphabetical");
			const sortedByNameIds = getPlaces(sortedByName).map(place => place.id);
			expect(sortedByNameIds.length).toBe(sortedByNameIds.length);
			const sortedByNameAnswer = [1, 3, 2];
			sortedByNameIds.forEach((sortedId, idx) => expect(sortedId).toBe(sortedByNameAnswer[idx]));
		});
	});
});

//for some reason, I can't define this in the describe
//block for the sorting tests, and then use it in each test
//in Jest, I could do
//let myVar: MyType;
//beforeEach(() => { myVar = "foo"; });
//test(() => expect(myVar).toBe("foo"))
//but not in vitest
function sortTestInitState(): State {
	return {
		origPlaces: [{
			latitude: 0,
			longitude: 0,
			name: "a",
			years: [2009, 2009],
			tags: [],
			description: "",
			id: 1,
		}, {
			latitude: 0,
			longitude: 0,
			name: "c",
			years: [1995],
			tags: [],
			description: "",
			id: 2,
		}, {
			latitude: 0,
			longitude: 0,
			name: "b",
			years: [1995, 1995],
			tags: [],
			description: "",
			id: 3,
		}],
		selectedPlaceIndex: 0,
		tags: [],
		sortingMethod: "none"
	};
};
