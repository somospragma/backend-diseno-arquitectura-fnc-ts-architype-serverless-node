import { User } from '@userManagement/domain/models/User';

export interface UserRepositoryPort {
 
   
  /**
   *
   *
   * @param {number} userId
   * @return {*}  {(Promise<User | null>)}
   * @memberof UserRepositoryPort
   */
  findById(userId: number): Promise<User | null>;


  /**
   *
   *
   * @param {number} offset
   * @param {number} limit
   * @return {*}  {Promise<User[]>}
   * @memberof UserRepositoryPort
   */
  findAll(offset: number, limit: number): Promise<User[]>;


  /**
   *
   *
   * @return {*}  {Promise<number>}
   * @memberof UserRepositoryPort
   */
  count(): Promise<number>

  
  /**
   *
   *
   * @param {User} user
   * @return {*}  {Promise<User>}
   * @memberof UserRepositoryPort
   */
  create(user: User): Promise<User>;

 
  /**
   *
   *
   * @param {User} user
   * @return {*}  {Promise<User>}
   * @memberof UserRepositoryPort
   */
  update(user: User): Promise<User>;

 
  /**
   *
   *
   * @param {number} userId
   * @return {*}  {Promise<void>}
   * @memberof UserRepositoryPort
   */
  delete(userId: number): Promise<void>;
}
