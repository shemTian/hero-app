import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

// Imports for loading & configuring the in-memory web api npm install
// 安装in-memory-api: npm install angular-in-memory-web-api --save-dev (--save 保存到package.json)
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import { InMemoryDataService }  from './in-memory-data.service';

import {AppComponent} from "./app.component";
import {HeroDetailComponent} from './hero-detail.component';
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "./hero.service";
import {DashboardComponent} from "./dashboard.component";
import {MessageService} from "./message.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forFeature(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
