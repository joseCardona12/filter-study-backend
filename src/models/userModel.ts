import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import ProductModel from "./productModel";

@Table({
    tableName: "users",
    timestamps: false
})
export default class UserModel extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id!: number;

    @Column({
        type: DataType.STRING(200),
        allowNull:false
    })
    name!:string;
    
    @Unique
    @Column({
        type: DataType.STRING(200),
        allowNull:false
    })
    email!:string;

    @Column({
        type: DataType.STRING(200),
        allowNull:false
    })
    password!:string;

    @HasMany(()=>ProductModel)
    products!:ProductModel[]
}