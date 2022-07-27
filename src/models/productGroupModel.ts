import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "product_group";  //ENTITY NAME
const filterForm = `
                    id, name, merchantid
                    `;

@Entity({ name: thisEntity})
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    merchantid!: number;

    async insertOne(body: any, files: any) {

        return await Product.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    name: body.name,
                    merchantid: parseInt(body.merchantId)
                }
            ])
            .returning(filterForm)
            .execute();
    }
    
    async selectAll() {
        return await Product.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectByMerchantid(merchantid: number) {
        return await Product.createQueryBuilder(thisEntity)
            .select(filterForm)
            .where(`${thisEntity}.id = :id`, { id: merchantid })
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async updateOne(body: any, files: any, id: number) {

        return await Product.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                merchantid: parseInt(body.merchantId)
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning(filterForm)
            .execute();
    }

    async deleteOne(id: number) {
        return await Product.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
