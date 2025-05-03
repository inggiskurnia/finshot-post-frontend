export interface PaginatedRequestParams {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
  hasPrev: boolean;
  hasNext: boolean;
}
