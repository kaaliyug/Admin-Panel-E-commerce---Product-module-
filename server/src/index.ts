import "reflect-metadata";
import * as dotenv from 'dotenv';
import express from "express"; 
import { connectDB } from "./DataSource";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import multer from "multer";
import path from 'path';
// Ensure uploads folder exists
import fs from 'fs';

dotenv.config();
const app = express();

// Calculate the uploads folder path
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}


// const storage = multer.diskStorage({
//   // destination: 'uploads/', 
//   // destination: path.join(__dirname, '..', 'uploads/'),
//     destination: UPLOADS_DIR,
//   filename: (req, file, cb) => {
//     //const uniqueName = Date.now() + '-' + file.originalname;
//         const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });
// app.use('/uploads', express.static(UPLOADS_DIR));


connectDB().then(() => {
    const port = process.env.PORT || 5000;
    console.log('✅ Connected to DB 📦');

    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')) );
    console.log('🧩 Serving uploads from:', path.join(__dirname, '..', 'uploads'));
    app.use(express.json()); 
    app.use(cors({
      credentials: true,
      origin:["http://localhost:4200"]
    }));


    const storage = multer.diskStorage({
      destination: path.join(__dirname, '..', 'uploads'),
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      }});
    const upload = multer({ storage });


    // 👇 Modular route
     app.use("/api", productRoutes);

     app.use(express.static("public"))
     app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html") )
    })
     
    app.listen(port, () => {
        console.log(`🚀 Server Running in 3,2,1 on http://localhost:${port}`);     
    });
})
.catch((err: Error) => {
    console.error('❌  DB Connection Error:', err);
});
