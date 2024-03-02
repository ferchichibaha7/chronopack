import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class Depot extends Model<Depot> {
  @PrimaryKey
  @AutoIncrement
  @Column
  depot_id: number;

  @Column
  depot_name: string;

  @Column
  location: string;

  @Column
  contact_info: string;
}