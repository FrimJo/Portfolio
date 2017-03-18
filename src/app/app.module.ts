import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CarouselComponent } from './portfolio/portfolio-item/carousel/carousel.component';
import { CarouselItemComponent } from './portfolio/portfolio-item/carousel/carousel-item/carousel-item.component';
import { PortfolioItemComponent } from './portfolio/portfolio-item/portfolio-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CarouselComponent,
    CarouselItemComponent,
    PortfolioItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
