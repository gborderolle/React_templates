export interface actor {
    id: number;
    name: string;
  }
  export interface actorCreationDTO {
    name: string;
    born?: Date;
    photo?: File;
    photoURL?: string;
    biography?: string;
  }
  
  export interface landingPageDTO { }
  
  export interface actorMovieDTO {
    id: number;
    name: string;
    character?: string;
    photoURL?: string;
  }
  
  export interface actorDTO {
    id: number;
    name: string;
    biography?: string;
    born?: Date;
    photoURL?: string;
  }
  