import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../../../server/src/interface/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
   backendUrl = environment.backendUrl;

  product: ProductInterface | null = null;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    // my code starts here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(+id).subscribe({
        next: (product) => this.product = product,
        error: (err) => console.error('Error fetching product', err)
      });
    }

  }
  
  
  nextImage() {
    if (!this.product) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }

  prevImage() {
    if (!this.product) return;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

  // my code ends here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕

}
