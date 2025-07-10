import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../../../server/src/interface/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProductImage } from '../../../../../server/src/interface/ProductImage';

@Component({
  selector: 'app-admin-products-form',
  templateUrl: './admin-products-form.component.html',
  styleUrls: ['./admin-products-form.component.css']
})
export class AdminProductsFormComponent implements OnInit {


  isEditMode: boolean = false;
  productId: number | null = null;

  productFormData: ProductInterface = {
    id: 0, sku: '', name: '', price: 0, images: [ { url: '', alt: '', title: '', width: undefined, height: undefined } ]
  };

  allProducts: ProductInterface[] = [];

  // Important for add and remove image field ()
  newProductSku: string = '';
  newProductName: string = '';
  newProductPrice: number = 0;
  newProductImages: ProductImage[] = [
    { url: '', alt: '', title: '', width: undefined, height: undefined } ];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  resetForm() {
    this.isEditMode = false;
    this.productFormData = {
      id: 0,  sku: '',  name: '',  price: 0, images: [ { url: '', alt: '', title: '', width: undefined, height: undefined } ] };
  }

  ngOnInit(): void {

    // my code starts here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getOne(+id).subscribe(product => {
      this.productFormData = product;
    }) } else {
      this.isEditMode = false;
    }

  this.loadAllProducts();    

  }

  // all crud operations

  addProduct(): void {
    if (!this.productFormData.sku || !this.productFormData.name || !this.productFormData.price) {
      alert('Please fill in all required fields (SKU, Name, Price)');
      return;
    }
    const productPayload: ProductInterface = {
      sku: this.productFormData.sku,
      name: this.productFormData.name,
      price: this.productFormData.price,
      images: this.productFormData.images.map(image => ({
         url: image.url || '',
         alt: image.alt || '',
         title: image.title || '',
         width: image.width || undefined,
         height: image.height || undefined
          }))
       };
  
      this.productService.create(productPayload).pipe(
        mergeMap(() => this.productService.getAll()),
        tap((refreshedProducts) => {
          this.allProducts = refreshedProducts;
          this.resetForm();
          alert('✅ Product added successfully!');
        })).subscribe({
          next: () => console.log('Product added and list refreshed.'),
          error: (error) => {
            console.error('❌ Error creating product:', error);
            alert('❌ Failed to add product. Check console for details.');
          }
      });
   }

  // loadAllProducts(): void {
  // this.productService.getAll().subscribe({
  //   next: (products) => {
  //     this.allProducts = products;
  //     console.log('✅ Products loaded:', this.allProducts);
  //   },
  //   error: (err) => {
  //     console.error('❌ Failed to load products:', err);
  //   }
  // });
  // }

 loadAllProducts(): void {
  this.productService.getAll().subscribe({
    next: (products) => {
      this.allProducts = products.map(product => {
        if (product.images && Array.isArray(product.images)) {
          product.images = product.images.map(image => {
            // Prepend backend domain if url is relative
            if (image.url.startsWith('/uploads')) {
              image.url = "https://admin-panel-e-commerce.onrender.com" + image.url;
            } else if (image.url.includes('localhost:3000')) {
              image.url = image.url.replace(
                'http://localhost:3000',
                "https://admin-panel-e-commerce.onrender.com"
              );
            }
            return image;
          });
        }
        return product;
      });

      console.log('✅ Products loaded with updated image URLs:', this.allProducts);
    },
    error: (err) => {
      console.error('❌ Failed to load products:', err);
    }
  });
}




  updateProduct(): void {
  if (!this.productFormData.id) {
    console.error('No product selected for update.');
    return;
  }

  this.productService.update(this.productFormData).subscribe({
    next: (updatedProduct) => {
      console.log('✅ Product updated successfully:', updatedProduct);
      this.loadAllProducts();  // ✅ call this after update
      this.resetForm();        // ✅ reset the form
    },
    error: (error) => {
      console.error('❌ Error updating product:', error);
    }
  });
}  
   
  addImageField(): void {
    this.productFormData.images.push({ url: '',  alt: '', title: '', width: undefined, height: undefined });
    }
  
    removeImageField(index: number): void {
      if (this.productFormData.images.length > 1) {
        this.productFormData.images.splice(index, 1);
      }
    }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

// my code ends here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕

}
