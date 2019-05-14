import {Component, Input, OnInit} from '@angular/core';
import * as wdk from 'wikidata-sdk';
import {SparqlResults} from 'wikidata-sdk';
import {WikidataProperty} from '../../Property';
import {HttpClient} from '@angular/common/http';
import {isUndefined} from 'util';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  @Input() f: any;
  properties: WikidataProperty[];
  schema: {
    '@context': 'http://schema.org';
    '@type': 'Organization';
    name: string;
    identifier: string;
    description?: string;
    foundingDate?: string;
    url?: string
    contactPoint?: {
      '@type': 'ContactPoint';
      telephone?: string;
      email?: string;
    };
    founders?: {
      '@type': 'Person';
      name: string;
    }[];
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getPropLabelValues(this.f.item.value).toPromise().then(r => wdk.simplify.sparqlResults(r)).then(s => {
      this.properties = s as unknown as WikidataProperty[];
      this.propertiesToJSONLD();
      console.log(this.properties);
    });
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: 'angular.io',
      description: 'description',
      identifier: 'Q54654',
      url: 'https://angular.io',
      foundingDate: '2009',
      founders: [
        {
          '@type': 'Person',
          name: 'Patrick Coombe'
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '[+561-526-8457]',
        email: 'info@elite-strategies.com'
      },
    };

  }

  getPropLabelValues(qid: string) {
    const query = ` PREFIX entity: <http://www.wikidata.org/entity/>
        SELECT ?propUrl ?propLabel ?valUrl ?valLabel ?picture
        WHERE
        {
         hint:Query hint:optimizer 'None' .
         { BIND(entity:${qid} AS ?valUrl) .
          BIND("N/A" AS ?propUrl ) .
          BIND("identity"@en AS ?propLabel ) .
         }
         UNION
         { entity:${qid} ?propUrl ?valUrl .
          ?property ?ref ?propUrl .
          ?property rdf:type wikibase:Property .
          ?property rdfs:label ?propLabel
         }

           ?valUrl rdfs:label ?valLabel
         FILTER (LANG(?valLabel) = 'es') .
         OPTIONAL{ ?valUrl wdt:P18 ?picture .}
         FILTER (lang(?propLabel) = 'es' )
        }
        ORDER BY ?propUrl ?valUrl`;
    const url2 = wdk.sparqlQuery(query);
    return this.http.get<SparqlResults>(url2);
  }

  propertiesToJSONLD() {
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'Organization', name: this.f.item.label, identifier: this.f.item.value
    };
    this.properties.forEach(p => {
      if (p.propUrl === 'P112') {
        if (isUndefined(this.schema.founders)) {
          this.schema.founders = [];
        }
        this.schema.founders.push({
          '@type': 'Person',
          name: p.valLabel as string
        });
      }
      if (p.propUrl === 'P154') {

      }
    });
    JSON.stringify(this.schema);
  }
}
