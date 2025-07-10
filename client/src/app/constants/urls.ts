import { environment } from "src/environments/environment";

// const Base_Url = environment.production ? "/api" : "http://localhost:3000/api";

// export const Products_Url = `${Base_Url}/products`
// export const Single_Products_Url = (id: number | string) => `${Base_Url}/products/${id}`;


const Base_Url = environment.production
  ? "https://admin-panel-e-commerce.onrender.com/api"
  : "http://localhost:3000/api";

export const Products_Url = `${Base_Url}/products`;
export const Single_Products_Url = (id: number | string) => `${Base_Url}/products/${id}`;
