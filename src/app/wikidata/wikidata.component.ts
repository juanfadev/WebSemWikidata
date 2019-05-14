import {Component, OnInit} from '@angular/core';
import * as wdk from 'wikidata-sdk';
import {HttpClient} from '@angular/common/http';
import {Entity, SparqlResults, SparqlValueType} from 'wikidata-sdk';
import {Dictionary} from 'wikidata-sdk/types/helper';
import {WikidataProperty} from '../Property';


@Component({
  selector: 'app-wikidata',
  templateUrl: './wikidata.component.html',
  styleUrls: ['./wikidata.component.css']
})
export class WikidataComponent implements OnInit {

  selectedEntityQid: number;
  entities: Dictionary<SparqlValueType>[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const startupQid = 'Q129238';
    const sparql = `
      SELECT ?item ?itemLabel ?loc ?locLabel ?geo WHERE {
        ?item wdt:P31 wd:${startupQid} .
        OPTIONAL{?item      wdt:P159 ?loc .
                ?loc wdt:P625 ?geo } .

        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }
      }
      `;
    const url = wdk.sparqlQuery(sparql);

    this.http.get<SparqlResults>(url).toPromise().then(r => wdk.simplify.sparqlResults(r)).then(res => {
      this.entities = res;
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

}
