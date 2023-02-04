import { describe, test, expect } from "vitest";

import data from "../src/assets/data/places.json";

import { State } from "../src/logic/State";

function getState(): State {
    const state = new State();
    state.initOrigPlaces(data.places);
    return state;
}

describe("State", () => {
    test("initialize tag list", () => {
        const state = getState();
        expect(state.getTags().map(x => x.name)).toEqual([
            "childhood",
            "education",
            "career",
            "adult"
        ]);
    });

    test("set a tag to be active", () => {
        const state = getState();
        expect(state.getActiveTags()).toEqual([]);

        state.activateTag("childhood");
        expect(state.getActiveTags().map(t => t.name)).toEqual(["childhood"]);
        state.activateTag("career");
        expect(state.getActiveTags().map(t => t.name)).toEqual(["childhood", "career"]);
    });

    test("set a tag to be inactive", () => {
        const state = getState();
        const testTag = "childhood";
        state.activateTag(testTag);
        expect(state.getActiveTags().map(t => t.name)).toEqual([testTag]);
        state.deactivateTag(testTag);
        expect(state.getActiveTags().map(t => t.name)).toEqual([]);
    });
});
