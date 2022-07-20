import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "category";  //ENTITY NAME


@Entity({ name: thisEntity})
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    image!: string;

    async insertOne(body: any, files: any) {
        
        return await Category.createQueryBuilder(thisEntity)
        .insert()
        .values([
            {
                name : body.name,
                image : `data:${files[0].mimetype};base64,${files[0].buffer.toString('base64')}`
            }
        ])
        .returning('*')
        .execute();
    }
    
    async selectAll() {
        return await Category.createQueryBuilder(thisEntity)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .getMany();
    }

    async updateOne(body: any, files: any, id: number) {
        return await Category.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                image: `data:${files[0].mimetype};base64,${files[0].buffer.toString('base64')}`
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning('*')
            .execute();
    }

    async deleteOne(id: number) {
        return await Category.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
