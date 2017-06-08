import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { RecipeBookModule } from './recipebook/recipebook.module';
import { ShoppingListModule } from './shoppinglist/shoppinglist.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { ShoppinglistService } from './shoppinglist/shoppinglist.service';
import { AppHttpService } from 'app/shared/http.service';
import { RecipebookService } from 'app/recipebook/recipebook.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RecipeBookModule,
    ShoppingListModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    ShoppinglistService,
    RecipebookService,
    AppHttpService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
