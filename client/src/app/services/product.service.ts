import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInterface } from '../../../../server/src/interface/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products_Url, Single_Products_Url } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // baseUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {
    console.log("➡️ Products_Url:", Products_Url);
    console.log("➡️ Single_Products_Url(1):", Single_Products_Url(1));
   }

  getAll() : Observable<ProductInterface[]> {
    // return this.http.get<{ status: string, data: ProductInterface[] }>(`${this.baseUrl}/products`)            
    return this.http.get<{ status: string, data: ProductInterface[] }>(Products_Url)                                                                                                        
    .pipe(map(response => response.data))
  }

  getOne(id: number) {
    // return this.http.get<ProductInterface>(`${this.baseUrl}/products/${id}`);
    return this.http.get<ProductInterface>(Single_Products_Url(id));
  }

  create(newProduct: ProductInterface) {
    // return this.http.post<ProductInterface>(`${this.baseUrl}/products`, newProduct);
    return this.http.post<ProductInterface>(Products_Url, newProduct);
  }

  update(product: ProductInterface) {
    const { id, sku, name, price, images } = product;
    const payload = { sku, name, price, images };
    // return this.http.put<ProductInterface>(`${this.baseUrl}/products/${id}`, payload );
    return this.http.put<ProductInterface> (Single_Products_Url(id), payload );
  }

  delete(product: ProductInterface) {
    const { id } = product;
    // return this.http.delete<{ message: string }>(`${this.baseUrl}/products/${id}`);
    return this.http.delete<{ message: string }>(Single_Products_Url(product.id));
  }
  
}
