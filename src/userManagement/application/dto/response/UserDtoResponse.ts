export class UserDtoResponse {
    id: number;
    fullName: string;
    birthDate: string;
  
    constructor(id: number, fullName: string, birthDate: string) {
      this.id = id;
      this.fullName = fullName;
      this.birthDate = birthDate;
    }
  }
  