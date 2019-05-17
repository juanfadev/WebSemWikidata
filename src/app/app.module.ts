import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WikidataComponent } from './wikidata/wikidata.component';
import {HttpClientModule} from '@angular/common/http';
import { EntityComponent } from './wikidata/entity/entity.component';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule, ButtonModule, ChartModule, RadioButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import { RatioCountryComponent } from './wikidata/ratio-country/ratio-country.component';

@NgModule({
  declarations: [
    AppComponent,
    WikidataComponent,
    EntityComponent,
    RatioCountryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxJsonLdModule,
    RadioButtonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    AccordionModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
