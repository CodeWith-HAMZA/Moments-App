export interface Note {
  id: string;
  owner: string;
  title: string;
  dateInMs: number;
  description: string ;
  categories: string[];
  tags: string[];
}

export type CurrentSelectedNote = string;
