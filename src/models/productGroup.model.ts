import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "product_group";  //ENTITY NAME
const filterForm = `
                    id, name, merchantid::TEXT
                    `;

@Entity({ name: thisEntity})
export class ProductGroup extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    merchantid!: number;

    async insertOne(body: any) {
 
        return await ProductGroup.createQueryBuilder(thisEntity)
        .insert()
        .values([
            {
                name : body.name,
                merchantid: body.merchantid
            }
        ])
        .returning(filterForm)
        .execute();
    }
    
    async selectAll() {
        return await ProductGroup.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectByMerchantid(merchantid: number) {
        return await ProductGroup.createQueryBuilder(thisEntity)
            .select(filterForm)
            .where(`${thisEntity}.merchantid = :id`, { id: merchantid })
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectMerchantidById(id: number) {
        return await ProductGroup.createQueryBuilder(thisEntity)
            .select(`merchantid`)
            .where(`${thisEntity}.id = :id`, { id: id })
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async updateOne(body: any, id: number) {
        return await ProductGroup.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                merchantid: body.merchantid
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning(filterForm)
            .execute();
    }

    async deleteOne(id: number) {
        return await ProductGroup.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
