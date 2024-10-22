import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './Role';

@Table export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;
}