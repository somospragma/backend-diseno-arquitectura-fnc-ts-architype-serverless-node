import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ name: 'birth_date', type: 'date'})
  birthDate!: string;

  constructor(id:number, firstName: string, lastName: string, birthDate: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }
}
