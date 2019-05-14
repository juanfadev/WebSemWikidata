import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WikidataComponent } from './wikidata/wikidata.component';
import {HttpClientModule} from '@angular/common/http';
import { EntityComponent } from './wikidata/entity/entity.component';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';

@NgModule({
  declarations: [
    AppComponent,
    WikidataComponent,
    EntityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxJsonLdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
