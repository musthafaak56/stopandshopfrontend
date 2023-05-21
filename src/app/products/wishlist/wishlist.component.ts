import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private api:ApiService){}

  wishproducts:any;
  searchTerm:string='';
  allcart:any=[];


  ngOnInit(): void {
    this.api.getwishlist().subscribe((result:any)=>{
      console.log(result)
      this.wishproducts=result
    })
    // this.searchTerm=this.api.searchTerm
    this.api.searchTerm.subscribe((resultSearchValue)=>{
      this.searchTerm=resultSearchValue
      console.log('hello',this.searchTerm);
    })

  }

  removeFromWishlist(id:any){
    this.api.removeItemFromWishlist(id).subscribe((result:any)=>{
      console.log(result)
      this.wishproducts=result
      alert('item removed')
    },
    (result:any)=>{
      console.log(result.error);
    })
  }

  addtocart(product:any){

    Object.assign(product,{quantity:1})

    this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartcount()
      console.log(result)
      this.allcart=result
    })
  }

}
