
export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	contributions: IContribution[];
	technologies: ITechnology[];
	experiences: IExperience[];
	educations: IEducation[];
	achievements: IArchievement[];
	writings: IWriting[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}

export interface IContribution {
	name: string;
	details: string;
	url: string;
	hide: boolean;
}
export interface IWriting {
	name: string;
	details: string;
	url: string;
	hide: boolean;
}

export interface IArchievement {
    title: string;
    link: string;
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string[];
	url: string;
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface IExperience {
	position: string;
	company: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
}
