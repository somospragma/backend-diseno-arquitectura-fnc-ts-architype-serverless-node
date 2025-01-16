export class UserDtoResponse {
    id: number;
    fullName: string;
  
    constructor(id: number, fullName: string) {
      this.id = id;
      this.fullName = fullName;
    }
  }
  