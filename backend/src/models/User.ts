import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './Role';
import { Depot } from './Depot';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string; // Assuming the password is hashed

  @Column({ allowNull: false, defaultValue: true })
  active: boolean; // User activation status

  
  @Column({ allowNull: true, defaultValue: false })
  issuper: boolean; // User activation status

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => Depot)
  @Column
  depot_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsTo(() => Depot)
  depot: Depot;
}