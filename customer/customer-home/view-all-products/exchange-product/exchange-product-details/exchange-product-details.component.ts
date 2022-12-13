import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart';
import { Customer } from 'src/app/shared/models/customer';
import { Exchange } from 'src/app/shared/models/exchange';
import { Product } from 'src/app/shared/models/product';
import { CustomerCartService } from '../../../customer-cart/customer-cart.service';
import { CustomerSharedService } from '../../../customer-shared-service';

@Component({
  selector: 'exchange-product-details',
  templateUrl: './exchange-product-details.component.html',
  styleUrls: ['./exchange-product-details.component.css']
})
export class ExchangeProductDetailsComponent implements OnInit {
  @Input()
  selectedProduct: Product;
  errorMessage: string;
  successMessage: string;

  constructor(private customerCommonService: CustomerSharedService, private customerCartService: CustomerCartService){}

  ngOnInit(): void {
  }

  addToCart(){
      this.successMessage = null
      this.errorMessage = null
      let cart:Cart[] = JSON.parse(sessionStorage.getItem("cart"));
      if(cart==null){
          cart = [];
      }
      let customer: Customer = JSON.parse(sessionStorage.getItem("customer"))
      let cartToAdd: Cart = new Cart();
      cartToAdd.customerEmailId = customer.emailId
      cartToAdd.quantity = 1;
      cartToAdd.product = this.selectedProduct;

      let alreadyAddedToCart:boolean = (cart.filter(c=>c.product.productId==this.selectedProduct.productId)).length != 0;
      
      if(alreadyAddedToCart){
          this.errorMessage = "Already added to Cart. Go to cart for modifying your selection."
      } else{
          cart.push(cartToAdd);
          this.customerCommonService.updateCartList(cart)
          sessionStorage.setItem("cart", JSON.stringify(cart));
          this.customerCommonService.addProductToCart(cartToAdd).subscribe((response)=>{
              this.successMessage=response;
          }, (error)=>{
              this.errorMessage = error;
          })
      }

 }

}
