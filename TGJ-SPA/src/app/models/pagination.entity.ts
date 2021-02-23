// Consider using an alternative to Pagination if it's .NET specific
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result!: T;
  pagination!: Pagination;
}
