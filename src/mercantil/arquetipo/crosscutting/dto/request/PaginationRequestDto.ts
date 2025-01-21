export class PaginationRequestDto {
    page: number;
    limit: number;
  
    constructor(query: any) {
      this.page = parseInt(query.page, 10) || 1;
      this.limit = parseInt(query.limit, 10) || 10;
    }
  }
  