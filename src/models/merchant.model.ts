import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "merchant";  //ENTITY NAME
const filterForm = `
                    id, name, ord AS order, description, category, address, phone, email, 
                    CONCAT('data:',imagetype,';base64,', encode(image, 'base64')) AS image,
                    CONCAT('data:',logotype,';base64,', encode(logo, 'base64')) AS logo
                    `;

@Entity({ name: thisEntity})
export class Merchant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    category!: number;

    @Column()
    address!: string;

    @Column()
    phone!: string;

    @Column()
    email!: string;

    @Column()
    ord!: number;

    @Column({ type: "bytea", nullable: false })
    logo!: Buffer;

    @Column()
    logotype!: string;

    @Column({ type: "bytea", nullable: false })
    image!: Buffer;

    @Column()
    imagetype!: string;

    async insertOne(body: any, files: any) {
        var flogo: Buffer;
        var fimage: Buffer;
        var flogotype: string;
        var fimagetype: string;

        for(let file of files){
            switch (file.fieldname) {
                case 'image':
                    fimage = file.buffer;
                    fimagetype = file.mimetype;
                    break;
                case 'logo':
                    flogo = file.buffer;
                    flogotype = file.mimetype;
                    break;
                default:
                    break;
            }
        }
        return await Merchant.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    name: body.name,
                    description: body.description,
                    category: parseInt(body.category),
                    address: body.address,
                    phone: body.phone,
                    email: body.email,
                    logo: flogo,
                    image: fimage,
                    logotype: flogotype,
                    imagetype: fimagetype
                }
            ])
            .returning(filterForm)
            .execute();
    }

    async insertShortOne(body: any) {
        
        return await Merchant.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    email: body.email,  
                }
            ])
            .execute();
    }
    
    async selectAll() {
        return await Merchant.createQueryBuilder(thisEntity)
            .select(filterForm)
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }
    
    async selectById(id: any) {
        return await Merchant.createQueryBuilder(thisEntity)
            .select(filterForm)
            .where(`${thisEntity}.id = :id`, { id: id })
            .execute();
    }

    async selectByEmail(body: any, form: string) {
        return await Merchant.createQueryBuilder(thisEntity)
            .select(form)
            .where(`${thisEntity}.email = :email`, { email: body.email })
            .execute();
    }

    async updateOne(body: any, files: any, id: number) {
        var flogo: Buffer;
        var fimage: Buffer;
        var flogotype: string;
        var fimagetype: string;

        for(let file of files){
            switch (file.fieldname) {
                case 'image':
                    fimage = file.buffer;
                    fimagetype = file.mimetype;
                    break;
                case 'logo':
                    flogo = file.buffer;
                    flogotype = file.mimetype;
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
                category: parseInt(body.category),
                address: body.address,
                phone: body.phone,
                email: body.email,
                logo: flogo,
                image: fimage,
                logotype: flogotype,
                imagetype: fimagetype
            })
            .where(`${thisEntity}.id = :id`, { id: id })
            .returning(filterForm)
            .execute();
    }

    async updateOrder(body: any) {

        await Merchant.getRepository().
            query(`CALL public.merchant_change_ord( 
                ${parseInt(body.original_order)} , 
                ${parseInt(body.destination_order)} )`);

        return await Merchant.createQueryBuilder(thisEntity)
        .select(filterForm)
        .where(`${thisEntity}.ord = :ord`, { ord: parseInt(body.destination_order) })
        .orderBy(`${thisEntity}.ord`, 'ASC')
        .execute();
    }

    async deleteOne(id: number) {
        return await Merchant.createQueryBuilder(thisEntity)
        .delete()
        .where(`${thisEntity}.id = :id`, { id: id })
        .execute();
    }
}
