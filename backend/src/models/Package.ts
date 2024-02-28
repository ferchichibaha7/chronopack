import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User'; // Assuming User model is defined
import { Status } from './Status'; // Assuming Status model is defined
import { DeliveryGroup } from './DeliveryGroup';

@Table
export class Package extends Model {
  @Column
  senderName: string;

  @Column
  senderAddress: string;

  @Column
  recipientName: string;

  @Column
  recipientAddress: string;

  @Column
  weight: number;

  @Column
  dimensions: string;

  @Column
  specialInstructions?: string; // Optional special instructions for handling

  @Column
  price: number;

  @ForeignKey(() => User)
  @Column
  senderId: number;

  @BelongsTo(() => User, { foreignKey: 'senderId' })
  sender: User;

  @ForeignKey(() => DeliveryGroup)
  @Column
  deliveryGroupId: number;

  @BelongsTo(() => DeliveryGroup)
  deliveryGroup: DeliveryGroup;

  @ForeignKey(() => Status)
  @Column
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

   @Column({ allowNull: true })
   returnReason: string; // Replace with "string" if no specific types are needed
 
}