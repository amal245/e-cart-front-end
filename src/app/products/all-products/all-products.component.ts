import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{


  allProducts:any = []
  searchKey:string=''

  constructor(private api:ApiService){

    console.log(this.api.searchTearm);
    
  }
  ngOnInit(): void {
    // make api to call to get all products
    this.api.getAllProduct().subscribe(
      (result:any)=>{
        console.log(result);
        this.allProducts = result
      },
      (result:any)=>{
        console.log(result.error);
        
      }
    )
    // get behaviour subject
    this.api.searchTearm.subscribe((result)=>{
      console.log(result);
      this.searchKey = result
    })
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
