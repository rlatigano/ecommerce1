import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
/*
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Ecommerce';
 // products: Product[] = []; product definition 

  constructor(private basketService: BasketService, private accountService: AccountService){}
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    

  /*  pagination was moved to the pagination component
  this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products?pageSize=50').subscribe({
      next: (response) => this.products = response.data, // what to do next
      error: error => console.log(error), // what to do if there is an error
      complete: () => {
        console.log('request completed');
        console.log('extra statement');
      }
    })*/
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id'); // esto es buscar en el temporario esto seria como el tempfac en mi caso
    if(basketId) this.basketService.getBasket(basketId); // obtengo el id temporal en la memoria 

  }

  loadCurrentUser(){

    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
