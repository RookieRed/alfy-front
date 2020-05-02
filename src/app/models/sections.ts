import {EventTile} from "./event.tile";
import {ApiFile} from "./file";
import {TimedWritableContent} from "./page";
import {Category} from "./pageFaq";

export class Section extends TimedWritableContent {
  id: number;
  title: string;
  // Permet de savoir si la Section est de type HTML, Slides, FAQ ou EventTiles
  type: 'html' | 'faq' | 'slides' | 'tiles';
}

// Section pour les parties HTML
// type = 'html'
export class HTMLSection extends Section {
  html: string;
  type: 'html';
}

// Section pour le caroussel
// type = 'slides'
export class SlidesShowSection extends Section {
  photos: ApiFile[];
  type: 'slides';
}

// Section pour agenda / sponsors...
// type = 'tiles'
export class EventsTilesSection extends Section {
  events: EventTile[];
  type: 'tiles';
}

// Section pour les FAQ
// type = 'faq'
export interface FAQSection extends Section {
  categories: Category[];
  type: 'faq';
}
