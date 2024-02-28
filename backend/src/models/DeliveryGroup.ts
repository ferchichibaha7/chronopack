import { Table, Column, Model, BelongsTo, HasMany, ForeignKey } from 'sequelize-typescript';
import { User } from './User'; // Assuming User model is defined
import { Status } from './Status';
import { Package } from './Package';

@Table
export class DeliveryGroup extends Model {
  @Column
  creationTime: Date;

  @ForeignKey(() => User)
  @Column
  managerId: number;

  @BelongsTo(() => User, { foreignKey: 'managerId' })
  manager: User;

  @ForeignKey(() => User)
  @Column
  courierId: number;

  @BelongsTo(() => User, { foreignKey: 'courierId' })
  courier: User;

  @ForeignKey(() => Status)
  @Column
  deliveryStatusId: number;

  @BelongsTo(() => Status)
  deliveryStatus: Status;

  @HasMany(() => Package)
  packages: Package[];
}