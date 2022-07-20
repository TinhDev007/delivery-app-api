import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "merchant";  //ENTITY NAME


@Entity({ name: thisEntity})
export class Merchant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    category!: string;

    @Column()
    address!: string;

    @Column()
    phone!: string;

    @Column()
    email!: string;

    @Column()
    logo!: string;

    @Column()
    image!: string;

    async insertOne(body: any) {
        // this.name = body.name;
        // this.description = body.description;
        // this.category = body.category;
        // this.address = body.address;
        // this.phone = body.phone;
        // this.email = body.email;
        // this.logo = body.logo;
        // this.image = body.image;
        await this.save();

        return await Merchant.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    name : body.name,
                    description : body.description,
                    category : body.category,
                    address : body.address,
                    phone : body.phone,
                    email : body.email,
                    logo : body.logo,
                    image : body.image
                }
            ])
            .returning('*')
            .execute();
    }
    
    async selectAll() {
        return await Merchant.createQueryBuilder(thisEntity)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .getMany();
    }

    async updateOne(body: any, id: number) {
        return await Merchant.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                description: body.description,
                category: body.category,
                address: body.address,
                phone: body.phone,
                email: body.email,
                logo: body.logo,
                image: body.image
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .execute();
    }

    async deleteOne(id: number) {
        return await Merchant.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
