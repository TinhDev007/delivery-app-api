import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "category";  //ENTITY NAME
const filterForm = `
                    id, name, ord AS order,
                    CONCAT('data:',imagetype,';base64,', encode(image, 'base64')) AS image
                    `;

@Entity({ name: thisEntity})
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    ord!: number;

    @Column({type : 'bytea', nullable: false})
    image!: Buffer;

    @Column()
    imagetype!: string;

    async insertOne(body: any, files: any) {
 
        return await Category.createQueryBuilder(thisEntity)
        .insert()
        .values([
            {
                name : body.name,
                image : files[0].buffer,
                imagetype: files[0].mimetype
            }
        ])
        .returning(filterForm)
        .execute();
    }
    
    async selectAll() {
        return await Category.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async updateOne(body: any, files: any, id: number) {
        return await Category.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                image: files[0].buffer,
                imagetype: files[0].mimetype
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning(filterForm)
            .execute();
    }

    async updateOrder(body: any) {

        await Category.getRepository().
            query(`CALL public.category_change_ord( 
                ${parseInt(body.original_order)} , 
                ${parseInt(body.destination_order)} )`);

        return await Category.createQueryBuilder(thisEntity)
        .select(filterForm)
        .where(`${thisEntity}.ord = :ord`, { ord: parseInt(body.destination_order) })
        .orderBy(`${thisEntity}.ord`, 'ASC')
        .execute();
    }

    async deleteOne(id: number) {
        return await Category.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
