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

    async insertOne(body: any) {
        this.name = body.name;
        this.image = body.image;
        await this.save();
    }
    
    async selectAll() {
        return await Category.createQueryBuilder(thisEntity)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .getMany();
    }

    async updateOne(body: any) {
        return await Category.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                image: body.image
            })
            .where(`${thisEntity}.id = :id`, { id: body.id })
            .execute();
    }

    async deleteOne(id: number) {
        return await Category.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
