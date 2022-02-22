export interface CourseSearchResultList {
	publicLearningPathResults: CourseSearchResult[]; // learning path = course
	count: number;
}

export interface CourseSearchResult {
	id: number;
	name: string;
	description: string;
	language: string;
	creationDate: string;
	modificationDate?: string;
	publisher: User;
	images: CourseImages;
}

export interface User {
	id: number;
	name: string;
}

export interface CourseImages {
	thumbnail: string;
	overview: string;
	digitalCover: string;
}
