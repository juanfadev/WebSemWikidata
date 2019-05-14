import {SparqlValueType} from 'wikidata-sdk';

export interface WikidataProperty {
  propLabel: SparqlValueType;
  propUrl: SparqlValueType;
  valUrl: SparqlValueType;
  valLabel: SparqlValueType;
  picture: SparqlValueType;
}
