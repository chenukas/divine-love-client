import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { NgxSpinnerModule } from "ngx-spinner";
// Services
import { AuthService } from "./services/auth.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
// Guards
import { AuthGuard } from "./guards/auth.guard";
// Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/dashboard/sidebar/sidebar.component";
import { NotificationPanelComponent } from "./components/main/notification-panel/notification-panel.component";
import { ProductsComponent } from "./components/dashboard/products/products.component";
import { CartComponent } from "./components/dashboard/sidebar/cart/cart.component";
import { AdminFormComponent } from "./components/dashboard/sidebar/admin-form/admin-form.component";
import { OrderFormComponent } from "./components/dashboard/sidebar/cart/order-form/order-form.component";
// Pipes
import { FilterPipe } from "./pipes/filter.pipe";
import { HighlightPipe } from "./pipes/highlight.pipe";
import { ShortenPipe } from "./pipes/shorten.pipe";
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    routingComponents,
    NotificationPanelComponent,
    ProductsComponent,
    CartComponent,
    OrderFormComponent,
    AdminFormComponent,
    FilterPipe,
    HighlightPipe,
    ShortenPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
