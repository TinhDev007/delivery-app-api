import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "client";  //ENTITY NAME
const filterForm = `
                    id, email
                    `;

@Entity({ name: thisEntity})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    async insertOne(body: any) {
 
        return await User.createQueryBuilder(thisEntity)
        .insert()
        .values([
            {
                email: body.email
            }
        ])
        .returning(filterForm)
        .execute();
    }
    
    async selectAll() {
        return await User.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectById(body: any) {
        return await User.createQueryBuilder(thisEntity)
            .select('*')
            .where(`${thisEntity}.id = :id`, { id: body.user_id })
            .execute();
    }

    async selectByEmail(body: any, form: string) {
        return await User.createQueryBuilder(thisEntity)
            .select(form)
            .where(`${thisEntity}.email = :email`, { email: body.email })
            .execute();
    }

    async updateOne(body: any, files: any, id: number) {
        return await User.createQueryBuilder(thisEntity)
            .update()
            .set({
                email: body.email
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning(filterForm)
            .execute();
    }

    async deleteOne(id: number) {
        return await User.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
