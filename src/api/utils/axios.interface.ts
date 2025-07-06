export interface IPaginatedResponse<T> {
  data: T[];
  paginationInfo: IPaginationInfo;
}

export interface IResponse<T> {
  data: T;
}

export interface IPaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}
