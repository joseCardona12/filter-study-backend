import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import ProductModel from "./productModel";

@Table({
    tableName: "stocks",
    timestamps: false
})
export default class StockModel extends Model{
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

    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    quantity!:number;
    @ForeignKey(()=>ProductModel)
    @Column({
        type: DataType.INTEGER,
        allowNull:false
    })
    product_Id!: number
}