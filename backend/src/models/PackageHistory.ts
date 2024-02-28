import { Table, Column, Model, ForeignKey, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { User } from './User'; // Assuming User model is defined
import { DeliveryGroup } from './DeliveryGroup';

@Table
export class PackageHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.INTEGER }) // Replace with the appropriate data type
  packageId: number;

  @ForeignKey(() => DeliveryGroup)
  @Column
  deliveryGroupId: number;
  
  // Foreign key for courier (optional)
  @ForeignKey(() => User)
  @Column({ allowNull: true })
  courierId: number;

  // New return reason for this specific entry
  @Column({ allowNull: true })
  returnReason: string;
  

}