export class Pagination {

  currentPage: number;
  totalPages: number;
  resultsPerPage: number;

  public static readonly DEFAULT_RESULTS_PER_PAGE = 20;

  constructor(obj?: {
    currentPage?: number,
    totalPages?: number,
    resultsPerPage?: number,
  }) {
    if (obj != null) {
      this.currentPage = obj.currentPage;
      this.totalPages = obj.totalPages;
      this.resultsPerPage = obj.resultsPerPage;
    }
  }
}
