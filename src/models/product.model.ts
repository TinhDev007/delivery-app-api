import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

const thisEntity = "product";  //ENTITY NAME
const filterForm = `
                    id, name, description, prod_group, price, quantity, published, featured, merchantid::TEXT,
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
    prod_group!: number;

    @Column()
    price!: number;

    @Column({type: Boolean, default: false})
    published!: Boolean;

    @Column({type: Boolean, default: false})
    featured!: Boolean;

    @Column()
    quantity!: number;

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
        var bool_published: Boolean=false;
        var bool_featured: Boolean=false;

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

        if(typeof body.published == 'string'){
            bool_published=body.published.toLowerCase() == 'true'
        }
        else if (typeof body.published == 'boolean') {
            bool_published=body.published;
        }

        if(typeof body.featured == 'string'){
            bool_featured=body.featured.toLowerCase() == 'true'
        }
        else if (typeof body.featured == 'boolean') {
            bool_featured=body.featured;
        }

        return await Product.createQueryBuilder(thisEntity)
            .insert()
            .values([
                {
                    name: body.name,
                    description: body.description,
                    prod_group: parseInt(body.prod_group),
                    price: parseInt(body.price),
                    published: bool_published,
                    // featured: bool_featured,
                    quantity: parseInt(body.quantity),
                    logotype: flogotype,
                    logo: flogo,
                    imagetype: fimagetype,
                    image: fimage,
                    merchantid: parseInt(body.merchantid)
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

    async selectByMerchantid(merchantid: number) {
        return await Product.createQueryBuilder(thisEntity)
            .select(filterForm)
            .where(`${thisEntity}.merchantid = :id`, { id: merchantid })
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async selectMerchantidById(id: number) {
        return await Product.createQueryBuilder(thisEntity)
            .select(`merchantid`)
            .where(`${thisEntity}.id = :id`, { id: id })
            .orderBy(`${thisEntity}.id`, 'ASC')
            .execute();
    }

    async updateOne(body: any, files: any, id: number) {
        var flogo: Buffer;
        var fimage: Buffer;
        var flogotype: string;
        var fimagetype: string;
        var bool_published: Boolean=false;
        var bool_featured: Boolean=false;

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

        if(typeof body.published == 'string'){
            bool_published=(body.published.toLowerCase() == 'true');
            
        }
        else if (typeof body.published == 'boolean') {
            bool_published=body.published;
        }

        if(typeof body.featured == 'string'){
            bool_featured=body.featured.toLowerCase() == 'true'
        }
        else if (typeof body.featured == 'boolean') {
            bool_featured=body.featured;
        }
        

        return await Product.createQueryBuilder(thisEntity)
            .update()
            .set({
                name: body.name,
                description: body.description,
                prod_group: parseInt(body.prod_group),
                price: parseInt(body.price),
                quantity: parseInt(body.quantity),
                logotype: flogotype,
                published: bool_published,
                // featured: bool_featured,
                logo: flogo,
                imagetype: fimagetype,
                image: fimage,
                merchantid: parseInt(body.merchantid)
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
