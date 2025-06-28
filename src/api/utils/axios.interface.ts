export interface IPaginatedResponse<T> {
  data: T[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export interface IResponse<T> {
  data: T;
}
