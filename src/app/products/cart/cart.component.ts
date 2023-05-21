import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private api:ApiService,private cartFB:FormBuilder){}
  
  allcart:any=[];
  totalcartprice:Number=0;
  grandtotal:Number=0;
  discount:Number=0;

  paymentstatus:boolean=false
  offerstatus:boolean=false
  makepayment:boolean=false

  username:string=''
  housenumber:string=''
  street:string=''
  state:string=''
  pincode:string=''

  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean=false

  addressform=this.cartFB.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })
  
  ngOnInit(): void {

    this.api.getcart().subscribe((result:any)=>{
      console.log(`getcartresult=`,result)
      this.allcart=result
      this.getgrandtotal()
      
    },
    (result:any)=>{
      console.log(result.error) 
    })

    this.initConfig();

  }


  removeFromCart(id:any){
    this.api.removeItemFromCart(id).subscribe((result:any)=>{
      console.log(result)
      this.allcart=result
      this.getgrandtotal()
      alert('item removed')
    },
    (result:any)=>{
      console.log(result.error);
    })
  }

  getgrandtotal(){
    let total=0
    this.allcart.forEach((item:any)=>{
      total+=Math.ceil(item.grandTotal)
      this.totalcartprice=Math.ceil(total)
      console.log(`grandTotal`,this.totalcartprice);
      if(total>300&&total<1000){
        let discount=total/100*10;
        this.discount=Math.ceil(discount)
        this.grandtotal=Math.floor(total-discount)
      }
      else if(total>1000){
        let discount=total/100*50;
        this.discount=Math.ceil(discount)
        this.grandtotal=Math.floor(total-discount)
      }
    })
  }
  
  addtocart(product:any){

    Object.assign(product,{quantity:1})

    this.api.addtocart(product).subscribe((result:any)=>{
      this.api.cartcount()
      this.getgrandtotal()
      console.log(result)
      this.allcart=result
    })
  }
  
  //increase cart item count
  incrementcartcount(id:any){
    this.api.incrementcartcount(id).subscribe((result:any)=>{
      this.getgrandtotal()
      console.log(`increment`,result)
      this.allcart=result
    })
  }
  
  //decrease cart item count
  decrementcartcount(id:any){
    this.api.decrementcartcount(id).subscribe((result:any)=>{
      this.getgrandtotal()
      console.log(`decrement`,result)
      this.allcart=result
    })
  }


  submitform(){
    if(this.addressform.valid){
      console.log(this.addressform.value);
      this.username=this.addressform.value.username||""
      this.housenumber=this.addressform.value.housenumber||""
      this.street=this.addressform.value.street||""
      this.state=this.addressform.value.state||""
      this.pincode=this.addressform.value.pincode||""
      this.paymentstatus=true
    }
    else{
      alert('Please Provide Valid Details')
    }
  }

  offers(){
    if(this.offerstatus==false){
      this.offerstatus=true
    }
    else{
      this.offerstatus=false
    }
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  makePayment(){
    this.makepayment=true
  }

  modalclose(){
    this.addressform.reset()
    this.paymentstatus=false
  }

}
