import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as wdk from 'wikidata-sdk';
import {HttpClient} from '@angular/common/http';
import {Entity, SparqlResults, SparqlValueType} from 'wikidata-sdk';
import {Dictionary} from 'wikidata-sdk/types/helper';


@Component({
  selector: 'app-wikidata',
  templateUrl: './wikidata.component.html',
  styleUrls: ['./wikidata.component.css']
})
export class WikidataComponent implements OnInit, OnChanges {

  @Input() query: string;
  entities: Dictionary<SparqlValueType>[];
  selectedEntitites: number[] = [];
  chart: boolean;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const startupQid = 'Q129238';
    const url = wdk.sparqlQuery(this.query);
    this.chart = false;

    this.http.get<SparqlResults>(url).toPromise().then(r => wdk.simplify.sparqlResults(r)).then(res => {
      this.entities = res;
      console.log(res);

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const url = wdk.sparqlQuery(this.query);
    this.entities = null;
    this.http.get<SparqlResults>(url).toPromise().then(r => wdk.simplify.sparqlResults(r)).then(res => {
      this.entities = res;
      if (res[0].countryLabel != null) {
        this.chart = true;
      } else {
        this.chart = false;
      }
      console.log(res);

    });
  }

  getEntities(ids: string[]) {
    const simplificationOptions = {
      // claims
      entityPrefix: 'wd',
      propertyPrefix: 'wdt',
      keepRichValues: true,
      keepQualifiers: true,
      keepReferences: true,
      keepIds: true,
      keepHashes: true,
      keepNonTruthy: true,
      // sitelinks
      addUrl: true,
      novalueValue: null,
      somevalueValue: null
    };
    const urls = wdk.getManyEntities({ids, props: ['info', 'claims'], format: 'json'});
    this.http.get<{ entities: Dictionary<Entity> }>(urls[0]).toPromise().then(res => {
      console.log(res);
      const a = wdk.simplify.entities(res.entities, simplificationOptions);
      console.log(a);
    });
  }

  showEntity(i: number) {
    this.selectedEntitites.push(i);
  }


}
