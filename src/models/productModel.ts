import { AutoIncrement, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import StockModel from "./stockModel";
import UserModel from "./userModel";

@Table({
    tableName: "products",
    timestamps: false
})
export default class ProductModel extends Model{
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
        type: DataType.TEXT,
        allowNull:false
    })
    description!:string;

    @Column({
        type: DataType.FLOAT(10,2),
        allowNull:false
    })
    price!:number;

    @ForeignKey(()=>UserModel)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    user_id!:number

    @HasMany(()=>StockModel)
    stocks!: StockModel[]
}