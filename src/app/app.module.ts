import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { RecipeBookModule } from './recipebook/recipebook.module';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingListModule } from './shoppinglist/shoppinglist.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    RecipeBookModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
