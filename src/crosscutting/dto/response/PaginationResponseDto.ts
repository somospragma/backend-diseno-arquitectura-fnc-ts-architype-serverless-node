export class PaginationResponseDto<T> {
    data: T;
    currentPage: number;
    totalPages: number;
    totalItems: number;  
  
    constructor(data: T, currentPage: number, totalItems: number, limit: number) {
      this.data = data;
      this.currentPage = currentPage;
      this.totalPages = Math.ceil(totalItems / limit);
      this.totalItems = totalItems;
    }
  }
  