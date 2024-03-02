import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Status } from './Status';
import { ReturnReason } from './ReturnReason';
import { Depot } from './Depot';
import { User } from './User';

@Table
export class Package extends Model<Package> {
  @PrimaryKey
  @AutoIncrement
  @Column
  package_id: number;

  @Column
  description: string;

  @Column
  weight: number;

  @Column
  price: number;

  @Column
  sender_id: number;

  @Column
  receiver_name: string;

  @Column
  receiver_address: string;

  @Column
  receiver_contact_info: string;

  @ForeignKey(() => Status)
  @Column
  status_id: number;

  @ForeignKey(() => ReturnReason)
  @Column
  reason_id: number;

  @ForeignKey(() => Depot)
  @Column
  depot_id: number;

  @Column
  delivery_cost: number;

  @Column
  is_paid: boolean;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsTo(() => ReturnReason)
  reason: ReturnReason;

  @BelongsTo(() => Depot)
  depot: Depot;

  @BelongsTo(() => User, { foreignKey: 'sender_id', as: 'sender' })
  sender: User;
}