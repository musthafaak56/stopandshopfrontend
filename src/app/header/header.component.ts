import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private api:ApiService){}

  cartcount:Number=0;
  wishlistcount:Number=0;

  ngOnInit(): void {
    this.api.cartitemcount.subscribe((result:any)=>{
      console.log(`header`,result)
      this.cartcount=result
    })
    this.api.wishlistcount.subscribe((result:any)=>{
      console.log(`header`,result)
      this.wishlistcount=result
    })
    this.api.wishlistcounter()
  }

  search(event:any){
    console.log(event)
    console.log(event.target.value)
    this.api.searchTerm.next(event.target.value)  //to assign new values to the behaviour subject 
    
  }

}
