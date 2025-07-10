import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductInterface } from '../../../../../server/src/interface/Product';
import { switchMap, tap } from 'rxjs/operators';
import { ProductImage } from '../../../../../server/src/interface/ProductImage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-admin-page',
  templateUrl: './products-admin-page.component.html',
  styleUrls: ['./products-admin-page.component.css']
})
export class ProductsAdminPageComponent implements OnInit {  
    
    // Important for add and remove image field ()
      newProductSku: string = '';
      newProductName: string = '';
      newProductPrice: number = 0;
      newProductImages: ProductImage[] = [
        { url: '', alt: '', title: '', width: undefined, height: undefined } ];

      allProducts: ProductInterface[] = [];    
  

    @Input() products: ProductInterface[] = [];
    @Output() edited = new EventEmitter<ProductInterface>();
    @Output() deleted  = new EventEmitter<ProductInterface>();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllProducts();   
  }  

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



    delete(product: ProductInterface) {
      this.deleted.emit(product);
    } 
  
    update(product: ProductInterface) {
      this.edited.emit(product);
    }
  

          handleDelete(product: ProductInterface) {
        this.productService.delete(product).pipe(
          tap(() => console.log('🗑️ Deleted:', product)),
          switchMap(() => this.productService.getAll())
        ).subscribe(updated => {
          this.allProducts = updated;
        });
      }
      
      handleEdit(product: ProductInterface) {
        this.router.navigate(['/admin/products-form', product.id]);

      
        this.newProductSku = product.sku;
        this.newProductName = product.name;
        this.newProductPrice = product.price;
        this.newProductImages = [...product.images]; 
      }
// 
}
