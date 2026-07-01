export interface ApiResponse<T> {
  data: T;
  message: string;
  status_code: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
