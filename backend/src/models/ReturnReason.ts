import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class ReturnReason extends Model<ReturnReason> {
  @PrimaryKey
  @AutoIncrement
  @Column
  reason_id: number;

  @Column
  reason_text: string;
}