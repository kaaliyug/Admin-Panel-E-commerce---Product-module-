import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductInterface } from "../interface/Product";
import { ProductImage } from "../interface/ProductImage";


@Entity("products")
export class Products implements ProductInterface {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true }) 
    sku!: string;

    @Column()
    name!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price!: number;

    @Column("jsonb", { nullable: true, default: () => "'[]'" })
    images!: ProductImage[];
}