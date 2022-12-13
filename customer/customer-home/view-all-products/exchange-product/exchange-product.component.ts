import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exchange } from 'src/app/shared/models/exchange';
import { Product } from 'src/app/shared/models/product';
import { CustomerSharedService } from '../../customer-shared-service';
import { ViewAllProductsService } from '../view-all-products.service';

@Component({
  selector: 'app-exchange-product',
  templateUrl: './exchange-product.component.html',
  styleUrls: ['./exchange-product.component.css']
})
export class ExchangeProductComponent implements OnInit {

  @Input()
  exchangeProduct: Exchange;
  displayProducts: Boolean;
  
  exchangeProductList: Exchange[];
  exchangeProductListToDisplay: Exchange[] = [];
  viewDetails: boolean = false;
  selectedProduct: Exchange;

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  posts;

  

  constructor(private viewAllProductService: ViewAllProductsService,
    private sharedService: CustomerSharedService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllExchangeProduct();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  
    // this.http.get('http://jsonplaceholder.typicode.com/posts')
    //   .subscribe(posts => {
    //     this.posts = posts;
    // });

  }

  getAllExchangeProduct(){
    this.viewAllProductService.getAllExchangeProduct().
    subscribe(exchange => {
      this.exchangeProductList = exchange;
      this.exchangeProductListToDisplay = this.exchangeProductList;
    });
  }

  setSelectedProduct(product: Exchange) {
    this.viewDetails = true;
    this.selectedProduct = product;
  }

  // activePage:number = 0;  
  
  // displayActivePage(activePageNumber:number){  
  //   this.activePage = activePageNumber  
  // } 
  
  
}
