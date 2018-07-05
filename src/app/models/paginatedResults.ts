import {Pagination} from "./pagination";

export class PaginatedResults {

  pagination: Pagination;
  results: any[];
  totalResults: number;

  constructor(obj?: {
    pagination?: Pagination
    results?: any[],
    totalResults?: number,
  }){
    if (obj != null) {
      this.pagination = obj.pagination;
      this.results = obj.results;
      this.totalResults = obj.totalResults;
    }
  }
}
