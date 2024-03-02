import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Package } from './Package';
import { Status } from './Status';
import { User } from './User';

@Table
export class PackageStateHistory extends Model<PackageStateHistory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  history_id: number;

  @ForeignKey(() => Package)
  @Column
  package_id: number;

  @ForeignKey(() => Status)
  @Column
  state_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  timestamp: Date;

  @Column
  location: string;

  @BelongsTo(() => Package)
  package: Package;

  @BelongsTo(() => Status)
  state: Status;

  @BelongsTo(() => User)
  user: User;
}