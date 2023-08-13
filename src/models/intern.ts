export interface Intern {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  added?: boolean;
}

export interface NewIntern {
  first_name: string;
  last_name: string;
  avatar?: string;
}
