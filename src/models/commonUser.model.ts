import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "usr";  //ENTITY NAME
const filterForm = `
                    id, email, role
                    `;

@Entity({ name: thisEntity})
export class CommonUser extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    role!: string;

    // async insertOne(body: any) {
 
    //     return await Admin.createQueryBuilder(thisEntity)
    //     .insert()
    //     .values([
    //         {
    //             email: body.email
    //         }
    //     ])
    //     .returning(filterForm)
    //     .execute();
    // }
    
    async selectAll() {
        return await CommonUser.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectByEmail(body: any) {
        return await CommonUser.createQueryBuilder(thisEntity)
            .select('*')
            .where(`${thisEntity}.email = :email`, { email: body.email })
            .execute();
    }

    // async updateOne(body: any, files: any, id: number) {
    //     return await Admin.createQueryBuilder(thisEntity)
    //         .update()
    //         .set({
    //             email: body.email
    //         })
    //         .where(`${thisEntity}.id = :id`, { id: id })
    //         .returning(filterForm)
    //         .execute();
    // }

    // async deleteOne(id: number) {
    //     return await Admin.createQueryBuilder(thisEntity)
    //     .delete()
    //     .where(`${thisEntity}.id = :id`, { id: id })
    //     .execute();
    // }
}
