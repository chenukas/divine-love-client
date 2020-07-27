import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

import { AuthService } from "src/app/services/auth.service";

import { User } from "src/app/models/User";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() user: User;
  orders: Order[];
  total: number = 0;
  isLoading: boolean = true;

  constructor (
    public authService: AuthService, 
    private router: Router,
    private spinner: NgxSpinnerService
    ) {}

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .subscribe(res => (this.authService.userDetails(res.user), this.authService.userOrdersDetails(res.orders[0])));
    this.authService.currentUserData.subscribe(user => (this.user = user));
    this.authService.currentUserOrdersData.subscribe(orders => (this.orders = orders));
    this.isLoading = false;
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.total = 0;
    this.user.cart.items.forEach(item => (this.total += item.prod_total));
  }

  logout() {
    this.authService.logoutUser();
    this.authService.userDetails(null);
    this.router.navigate["/"];
  }
}
