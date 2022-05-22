export type PaginationOptions = {
  limit?: number;
  offset?: number;
};

export type PaginatedData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
};
