import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Status extends Model {
  @Column
  statusName: string;

  @Column
  description?: string; // Optional description for the status
}