import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'centers' }) // Explicitly specify table name
export class Center extends Model {
  @Column
  name: string;

  @Column
  address: string;
}