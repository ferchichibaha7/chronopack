import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Center } from './Center'; // Assuming Center model is defined

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string; // Hashed password

  @Column({ allowNull: false, defaultValue: true })
  active: boolean; // User activation status

  @Column
  userType: string; // "admin", "manager", "courier", "store", etc.

  @ForeignKey(() => Center)
  @Column({ allowNull: true })
  centerId: number;

  @BelongsTo(() => Center)
  center: Center;
}