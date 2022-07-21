import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "product";  //ENTITY NAME
const filterForm = `
                    id, name, description, prod_group, price, quantity, email, merchantid
                    CONCAT('data:',imagetype,';base64,', encode(image, 'base64')) AS image,
                    CONCAT('data:',logotype,';base64,', encode(logo, 'base64')) AS logo
                    `;

@Entity({ name: thisEntity})
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    prod_group!: string;

    @Column()
    price!: number;

    @Column()
    quantity!: number;

    @Column()
    email!: string;

    @Column({ type: "bytea", nullable: false })
    logo!: Buffer;

    @Column({ type: "bytea", nullable: false })
    image!: Buffer;

    @Column()
    logotype!: string;

    @Column()
    imagetype!: string;

    @Column()
    merchantid!: number;

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

        return await Product.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    name: body.name,
                    description: body.description,
                    prod_group: body.prod_group,
                    price: parseInt(body.price),
                    quantity: parseInt(body.quantity),
                    email: body.email,
                    logotype: flogotype,
                    logo: flogo,
                    imagetype: fimagetype,
                    image: fimage,
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

        return await Product.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                description: body.description,
                prod_group: body.prod_group,
                price: parseInt(body.price),
                quantity: parseInt(body.quantity),
                email: body.email,
                logotype: flogotype,
                logo: flogo,
                imagetype: fimagetype,
                image: fimage,
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
