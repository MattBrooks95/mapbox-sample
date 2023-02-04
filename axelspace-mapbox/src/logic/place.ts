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
};

type Tag = {
	name: string;
	active: boolean;
}
