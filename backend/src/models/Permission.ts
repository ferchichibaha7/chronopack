import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './Role';

@Table
export class Permission extends Model<Permission> {
  @PrimaryKey
  @AutoIncrement
  @Column
  permission_id: number;

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @Column
  permission_name: string;

  @BelongsTo(() => Role)
  role: Role;
}