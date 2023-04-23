export type Direction = 'ASC' | 'DESC';
export type PageOrder = {
  direction: Direction;
  property: string;
};
export type PageSort = {
  orders: PageOrder[];
};
export type Pageable = {
  page: number;
  size: number;
  sort?: PageSort;
};

export type Page<T> = {
  content: T[];
  total: number;
  pagable: Pageable;
};

export const defaultPage = {
  content: [],
  total: 0,
  pagable: {
    page: 0,
    size: 10,
  },
};