export type Page<T> = {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  hasContent: boolean;
  totalPage: number;
  numberOfElements: number;
};

export const defaultPage = {
  content: [],
  number: 0,
  size: 0,
  totalElements: 0,
  first: false,
  last: false,
  hasContent: false,
  totalPage: 0,
  numberOfElements: 0,
};
