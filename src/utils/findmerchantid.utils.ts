import { Product, ProductGroup } from "../models/main.model";


export async function findmerchantid(req){
    try {
        let entity = req.route.path.split('/')[1].slice(0,-1);
    var res=[];
    switch(entity) {
        case 'product':
            res = await new Product().selectMerchantidById(req.params[`${entity}_id`]);
            break;
        case 'productgroup':
            res = await new ProductGroup().selectMerchantidById(req.params[`${entity}_id`]);
            break;
        default:
            break;
    }
    if(res.length)
        return res[0].merchantid;
    else
        return undefined;
    } catch (error) {
        return undefined;
    }
}