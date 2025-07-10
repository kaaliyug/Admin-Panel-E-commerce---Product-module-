import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductInterface } from '../../../../../server/src/interface/Product';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() products: ProductInterface[] = [];
  @Output() edited = new EventEmitter<ProductInterface>();
  @Output() deleted  = new EventEmitter<ProductInterface>();

    backendUrl = environment.backendUrl;

  currentIndexes: number[] = [];
  intervalRefs: any[] = [];

  constructor() { }

  ngOnInit(): void { }

  // my code starts here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && this.products?.length) {
      this.resetSlider();
      this.initializeSlider();
    }
  }  
   
  initializeSlider(): void {
    this.currentIndexes = this.products.map(() => 0);

    this.products.forEach((product, index) => {
      if (product.images?.length > 1) {
        const interval = setInterval(() => {
          this.currentIndexes[index] =
            (this.currentIndexes[index] + 1) % product.images.length;
        }, 3000);
        this.intervalRefs.push(interval);
      }
    });
  }

  resetSlider(): void {
    this.intervalRefs.forEach(clearInterval);
    this.intervalRefs = [];
    this.currentIndexes = [];
  }

  ngOnDestroy(): void {
    this.resetSlider();
  }

  delete(product: ProductInterface) {
    this.deleted.emit(product);
  } 

  update(product: ProductInterface) {
    this.edited.emit(product);
  }

  // my code ends here ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕

}
