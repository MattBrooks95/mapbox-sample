export type {
	Place,
	Tag
}

type Place = {
	latitude: number;
	longitude: number;
	name: string;
	tags: string[];
	years: number[];
	description: string;
	id: number;
};

type Tag = {
	name: string;
	/** whether or not the filtering is active */
	active: boolean;
}
