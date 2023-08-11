export interface Intern {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  added?: boolean;
}

export interface NewIntern {
  firstName: string;
  lastName: string;
  image: string;
}
