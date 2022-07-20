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

    async insertOne(body: any, files: any) {
        var flogo: string = "";
        var fimage: string = "";

        for(let file of files){
            switch (file.fieldname) {
                case 'image':
                    fimage = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    break;
                case 'logo':
                    flogo = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    break;
                default:
                    break;
            }
        }
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
                    logo : flogo,
                    image : fimage
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

    async updateOne(body: any, files: any, id: number) {
        var flogo: string = "";
        var fimage: string = "";

        for(let file of files){
            switch (file.fieldname) {
                case 'image':
                    fimage = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    break;
                case 'logo':
                    flogo = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    break;
                default:
                    break;
            }
        }

        return await Merchant.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                description: body.description,
                category: body.category,
                address: body.address,
                phone: body.phone,
                email: body.email,
                logo: flogo,
                image: fimage
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning('*')
            .execute();
    }

    async deleteOne(id: number) {
        return await Merchant.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
