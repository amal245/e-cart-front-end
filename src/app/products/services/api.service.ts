import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold seaech  tearm as behviour subject
  searchTearm = new BehaviorSubject('')
  // to hold cart total count
  cartItemCount = new BehaviorSubject(0)

  
  // BASE_URL = 'http://localhost:3000'
  // deployed node server - https://ecart-r526.onrender.com
  BASE_URL = 'https://ecart-r526.onrender.com'



  constructor(private http:HttpClient) { 
  this.cartCount()
  }


  // get all product api
  getAllProduct(){
    // call api
    return this.http.get(`${this.BASE_URL}/products/get-all-products`)
  }

  // view product detail api
  viewAproduct(id:any){
     // call api
     return this.http.get(`${this.BASE_URL}/products/${id}`)
  }

  // products/add-to-wishlist
  addtoWishlist(product:any){
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
    // api call
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`,body)
  }

  // get all items from wishlist
  getWishlistItems(){
    // apicall
    return this.http.get(`${this.BASE_URL}/wishlist/get-all-items`)
  }
  // removing an item from wishlist
  removeWishlistItem(id:any){
    // api call
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)
  
  }
  // add to cart

  addTocart(product:any){
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    // api call
    return this.http.post(`${this.BASE_URL}/products/add-to-cart`,body)
  }

  // getcart
  getCart(){
  // apicall
  return this.http.get(`${this.BASE_URL}/cart/get-all-items`)
  }

  // cart count
  cartCount(){
    this.getCart().subscribe(
      (result:any)=>{
        this.cartItemCount.next(result.length)
      }
    )
  
  }

  // remove cart item api  
  removeCartItem(id:any){
    // api call
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)
  }

  // incerment cart item
  incrCartItem(id:any){
   // api call
     return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)
  }
   // incerment cart item
   decrCartItem(id:any){
    // api call
      return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)
   }

  //  empty cart
  emptyCart(){
    // api call
   return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)
  }
}
