import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { User } from './User';

@Table export class Role extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    roleName!: string;

    @HasMany(() => User)
    users!: User[];
}