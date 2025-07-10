import { Component, OnInit } from '@angular/core';
import { ProductInterface } from '../../../../../server/src/interface/Product';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  products$!: Observable<ProductInterface[]>;
  public backendUrl = environment.backendUrl;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
  }

}
