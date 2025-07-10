import  { Request, Response, Router } from "express";
import { Products } from "../entities/product.entity";
import multer from "multer";
import { ProductImage } from "../interface/ProductImage";
import { getConnection, getRepository } from "typeorm";


const router = Router();
const upload = multer({ dest: "uploads/" });

// routes

// create or add new product 
router.post("/products",   async (req:Request, res: Response) => {
    try {        
        // 1. Using TypeORM Express Route
        const { sku, name, price, images } = req.body;
        const repo = getRepository(Products);  
        const typeormNewProduct = repo.create({ sku, name, price, images });     
        const savedProduct = await repo.save(typeormNewProduct);
        console.log(images)
        res.status(201).json({
            status: 'OK',
            data: savedProduct,
        });

        // 2.  ⚪ If You Want Raw SQL Instead With Query Parameters
        // const sqlNewProduct = await getConnection().query("Insert into products (sku, name, price, images) VALUES  ($1, $2, $3, $4) RETURNING *",  
        //     [req.body.sku, req.body.name, req.body.price, JSON.stringify(req.body.images)]);
        
        // res.json(sqlNewProduct)
        // console.log(sqlNewProduct)

    } catch (error) {
        console.error('❌ Error creating product:', error);
        res.status(500).json({ error: "Failed to create product", details: error});
    }
});


// POST /products/upload
router.post('/upload', upload.array('images', 5), async (req: Request, res: Response):Promise<any> => {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No images uploaded' });
  }
  const imagePaths = files.map(file => ({
    url: `http://localhost:3000/uploads/${file.filename}`, 
    alt: file.originalname
  }));

  res.status(200).json({ message: 'Upload successful', images: imagePaths });
});


// read or get all products
router.get("/products", async (req: Request, res: Response):Promise<any>  => {
    try {
        // 1. Using TypeORM Express Route
        const repo = getRepository(Products);
        const products = await repo.find();
        return res.json({
            status: "TypeORM Express Route OK",
            data: products
        })
        // 2.  ⚪ If You Want Raw SQL Instead With Query Parameters
        const sqlProducts = await getConnection().query("SELECT * FROM products");        
        res.status(200).json({
            status: "SUCCESS",
            sqlProducts: sqlProducts.length,
            data: { products: sqlProducts }
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch all products", details: error});
    }
})

// get single product
router.get("/products/:id", async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        // 1. Using TypeORM Express Route
        const repo = getRepository(Products);
        const product = await repo.findOne({ where: { id: parseInt(id) } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);

        // 2.  ⚪ If You Want Raw SQL Instead With Query Parameters
        // console.log(req.params);
        // const { id } = req.params;
        // if (!id) return res.status(400).json({ error: "ID is required" });
        // // select * from products where id = req.params.id this is what we are going to do
        // const sqlSingleProduct = await getConnection().query("SELECT * FROM products WHERE id = $1", [id]);
        // if (sqlSingleProduct.length === 0) return res.status(404).json({ error: "Product not found" });
        // console.log(sqlSingleProduct);
        // res.json(sqlSingleProduct[0]);
    } catch (error) { 
        res.status(500).json({ error: "Server error", details: error });
    } 
})

// update product 
router.put("/products/:id", async (req: Request, res: Response) :Promise<any> => {
    
    const id = parseInt(req.params.id, 10);
    const { sku, name, price, images } = req.body;
    try {
        // 1. Using TypeORM Express Route
        const productRepo = getConnection().getRepository(Products);
        const product = await productRepo.findOne({ where: { id: Number(id) } });  
        // const product = await productRepo.findOne({ where: { id } });

        if (!product) return res.status(404).json({ error: "Product not found by TypeORM" });

        if (images && Array.isArray(images)) {
            for (const img of images) {            
                if (!img.url) {
                    return res.status(400).json({ error: "Each image must have a url property" });
                }
            }
            product.images = images as ProductImage[];
        }

        if (sku !== undefined) product.sku = sku;
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        
        await productRepo.save(product);        
        res.json({ message: "Product updated successfully", product });

        // 2.  ⚪ If You Want Raw SQL Instead With Query Parameters
        // const productResult = await getConnection().query("SELECT * FROM products WHERE id = $1", [id]);
        // if (productResult.length === 0) { return res.status(404).json({ error: "Product not found by Raw SQL" });  }

        // const existing = productResult[0];
        // // Update product using raw SQL query
        // await getConnection().query(`UPDATE products SET sku = $1, name = $2, price = $3, images = $4 WHERE id = $5`,
        //     [ sku ?? existing.sku, name ?? existing.name, price ?? existing.price, JSON.stringify(images), id, ] 
        // );

        // // Fetch and return updated product
        // const sqlUpdatedProduct = await getConnection().query("SELECT * FROM products WHERE id = $1", [id] );
        // res.json(sqlUpdatedProduct[0]);
     } catch (error) {
        res.status(500).json({ error: "Failed to update product", details: error });
     } 
})

// to delete a product
router.delete("/products/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const repo = getRepository(Products);
        const target = await repo.delete({ id });
        // await repo.delete({ id: +req.params.id });
        //  res.json({ deleted: true });
        res.json({ status: "OK", data: target });     
        
        // 2.  ⚪ If You Want Raw SQL Instead With Query Parameters
        const sqlDeleteProduct = await getConnection().query("DELETE FROM products WHERE id = $1", [id]);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product", details: error });
    }   
});




export default router;