import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
    this.cartcount()
   }

  //to hold  search value
  searchTerm= new BehaviorSubject('')
  
  //to hold  cart items count
  cartitemcount= new BehaviorSubject(0)
  
  //to hold  wishlist items count
  wishlistcount= new BehaviorSubject(0)

  base_url='https://stopandshop.onrender.com'

  //api call for get all products
  getallproducts(){
    return this.http.get(`${this.base_url}/products/all-products`)
  }
  
  //api call for view product
  viewproduct(id:string){
    return this.http.get(`${this.base_url}/products/view-product/${id}`)
  }

  //api call for add to wishlist
  addtowishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    return this.http.post(`${this.base_url}/wishlist/add-to-wishlist`,body)
  }
  
  //apicacart
  getwishlist(){
    return this.http.get(`${this.base_url}/wishlist/get-wishlist`)
  }

  //apicall for remove item from wishlist
  removeItemFromWishlist(id:any){
    return this.http.delete(`${this.base_url}/wishlist/remove-wishlist-item/${id}`)
  }


  //api call for addtocart
  addtocart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.base_url}/cart/add-to-cart`,body)
  }

  //increase cart item quantity
  incrementcartcount(productid:any){
    // const body={id:productid}
    return this.http.get(`${this.base_url}/cart/increment-count/${productid}`)
  }
  
  //decrease cart item quantity
  decrementcartcount(productid:any){
    // const body={id:productid}
    return this.http.get(`${this.base_url}/cart/decrement-count/${productid}`)
  }

  //apicall for getcart
  getcart(){
    return this.http.get(`${this.base_url}/cart/get-cart`)
  }

  //cart count
  cartcount(){
    this.getcart().subscribe((result:any)=>{
      console.log(result.length)
      this.cartitemcount.next(result.length)
    })
  }

  //wishlist count
  wishlistcounter(){
    this.getwishlist().subscribe((result:any)=>{
      console.log(result.length)
      this.wishlistcount.next(result.length)
    })
  }

  //apicall for remove item from cart
  removeItemFromCart(id:any){
    return this.http.delete(`${this.base_url}/cart/remove-cart-item/${id}`)
  }

}
