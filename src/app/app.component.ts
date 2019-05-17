import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebSemWikidata';
  selectedValue = 0;
  startupQid = 'Q129238';
  showWikidata: boolean;
  queries = [`
      SELECT ?item ?itemLabel ?loc ?locLabel ?geo WHERE {
        ?item wdt:P31 wd:${this.startupQid} .
        OPTIONAL{?item      wdt:P159 ?loc .
                ?loc wdt:P625 ?geo } .

        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es,en". }
      }
      `, `SELECT ?item ?itemLabel WHERE {
          ?item wdt:P31 wd:Q129238 .
          ?item wdt:P17 wd:Q29;
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es, en". }
      }`,
      `SELECT (COUNT(?start) as ?startups) (COUNT(?comp) as ?companies) ((COUNT(?comp) / COUNT(?start) ) as ?ratio) ?countryLabel WHERE
      {
      {
        SELECT ?start ?country WHERE
        {
          ?start wdt:P31 wd:Q129238 .
          ?start wdt:P17 ?country .
        }
      }
      UNION
      {
        SELECT ?comp ?country WHERE
        {
          ?comp wdt:P31 wd:Q4830453 .
          ?comp wdt:P17 ?country .
        }
      }
                SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es, en". }
      }
      GROUP BY ?countryLabel
      ORDER BY DESC(?ratio) `
  ];
}
