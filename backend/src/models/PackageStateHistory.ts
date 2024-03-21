import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Package } from './Package';
import { Status } from './Status';
import { User } from './User';
import { Depot } from './Depot';
import { ReturnReason } from './ReturnReason';

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

  @ForeignKey(() => User) // Foreign key for coursier
  @Column
  coursier_id: number;

  @ForeignKey(() => Depot) // Foreign key for depot
  @Column
  depot_id: number;

  @ForeignKey(() => ReturnReason)
  @Column
  reason_id: number;

  @BelongsTo(() => Package)
  package: Package;

  @BelongsTo(() => Status)
  state: Status;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => User, { foreignKey: 'coursier_id', as: 'coursier' }) // Belongs to the coursier
  coursier: User;

  @BelongsTo(() => Depot, { foreignKey: 'depot_id', as: 'depot' }) // Belongs to the depot
  Depot: Depot;

  @BelongsTo(() => ReturnReason)
  reason: ReturnReason;
}