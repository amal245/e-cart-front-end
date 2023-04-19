import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
// to hold product id
  productId:string=""
// to hold product details
product:any={}
  constructor(private viewActivatedRoute:ActivatedRoute, private api:ApiService ){

  }
  ngOnInit(): void {
    // get path parameter from component route
    this.viewActivatedRoute.params.subscribe((data:any)=>{
    console.log(data);
    this.productId = data.id
    })

    // api call to get perticular product detals
    this.api.viewAproduct(this.productId).subscribe(
      // 200
      (result:any)=>{
        console.log(result);
        this.product = result
      },
      // 400
      (result:any)=>{
        console.log(result.error);
        
      }
    )
  }

  addToWishlist(product:any){
    this.api.addtoWishlist(product)
    .subscribe((result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }


   // addtocart(product)
   addtocart(product:any){
    // add quantity key to product object with value as 1
    Object.assign(product,{quantity:1})
    console.log(product);
    

    // call api
    this.api.addTocart(product)
    .subscribe(
      // 200 responce
      (result:any)=>{
        // call method to get cart count
        this.api.cartCount()
        alert(result)
      },
      (result:any)=>{
        alert(result.error)
      }
    )
  }

}
