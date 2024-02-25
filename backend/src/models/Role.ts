import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { User } from './User'

@Table
export class Role extends Model {
  @Column
  name: string

  @HasMany(() => User)
  users: User[]

}