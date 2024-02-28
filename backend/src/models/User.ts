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

  @Column({ type: 'BLOB', allowNull: true }) // New column for storing image data
  profilePicture: Buffer; // Change the type to Buffer to store binary data

  @ForeignKey(() => Center)
  @Column({ allowNull: true })
  centerId: number;

  @BelongsTo(() => Center)
  center: Center;
}