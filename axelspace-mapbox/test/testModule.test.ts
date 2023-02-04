import { describe, expect, test } from "vitest";
import { fib } from "../src/logic/testModule";

describe("testModule", () => {
	describe("fib", () => {
		const cases: [number, number | undefined][] = [
			[-1, undefined],
			[0, 0],
			[1, 1],
			[2, 1],
			[3, 2],
			[4, 3],
			[5, 5],
			[6, 8],
			[7, 13],
			[8, 21],
		];
		test.each(cases)("fib: %d answer:%d", (input: number, output: number | undefined) => {
			expect(fib(input)).toBe(output);
		});
	});
});
