import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  productId:string='';
  viewproduct:any={};
  oldprice:Number=0;
  allcart:any=[];


  constructor(private viewactivatedRoute:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.viewactivatedRoute.params.subscribe((result:any)=>{
      console.log(result.id)
      this.productId=result.id;
    })

    this.api.viewproduct(this.productId).subscribe((result:any)=>{
      console.log(result)
      this.viewproduct=result
      this.oldprice=this.viewproduct.price+50;
    })

  }
  
  addtowishlist(){
    const{id,title,price,image}=this.viewproduct
    //api call
    this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
      this.api.wishlistcounter()
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
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
