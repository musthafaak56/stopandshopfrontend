import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allproducts:any=[];
  allcart:any=[];

  productId:string='';
  viewproduct:any={};

  searchTerm:string='';

  constructor(private api:ApiService,private viewactivatedRoute:ActivatedRoute){}
  
  ngOnInit(): void {
      this.api.getallproducts().subscribe((result:any)=>{
        console.log(result)
        this.allproducts=result
      })
      // this.searchTerm=this.api.searchTerm
      this.api.searchTerm.subscribe((resultSearchValue)=>{
        this.searchTerm=resultSearchValue
        console.log('hello',this.searchTerm);
      })

      // this.viewactivatedRoute.params.subscribe((result:any)=>{
      //   console.log(result.id)
      //   this.productId=result.id;
      // })
      // this.api.viewproduct(this.productId).subscribe((result:any)=>{
      //   console.log(result)
      //   this.viewproduct=result
      // })
      
  }

  addtocart(product:any){

    Object.assign(product,{quantity:1})

    this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartcount()
      console.log(result)
      this.allcart=result
    })
  }

  // addtowishlist(){
  //   const{id,title,price,image}=this.allproducts
  //   //api call
  //   this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
  //     this.api.wishlistcounter()
  //     alert(result)
  //   },
  //   (result:any)=>{
  //     alert(result.error)
  //   })
  // }


}
