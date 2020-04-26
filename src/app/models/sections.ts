import {TimedWritableContent} from "./timed.writable.content";
import {EventTile} from "./event.tile";
import {User} from "./user";

export class Section extends TimedWritableContent {
  id: number;
  title: string;
  // Permet de savoir si la Section est de type HTML, Slides, FAQ ou EventTiles
  type: 'html' | 'faq' | 'slides' | 'tiles';

  constructor(obj?: { createdAt?: Date; updatedAt?: Date; lastWriter?: User }, obj2?: {id?: number, title?: string, type?: "html" | "faq" | "slides" | "tiles"}) {
    super(obj);
    if ( obj2 != null ) {
      this.id = obj2.id;
      this.title = obj2.title;
      this.type = obj2.type;
    }
  }
}

// Section pour les parties HTML
// type = 'html'
export class HTMLSection extends Section {
  html: string;

  constructor(obj?: { createdAt?: Date; updatedAt?: Date; lastWriter?: User }, obj2?: { id?: number; title?: string; type?: "html" | "faq" | "slides" | "tiles" }, obj3?: {html: string}) {
    super(obj, obj2);
    if (obj3 != null ) {
      this.html = obj3.html;
    }
  }
}

// Section pour le caroussel
// type = 'slides'
export class SlidesShowSection extends Section {
  photos: File[];


  constructor(obj?: { createdAt?: Date; updatedAt?: Date; lastWriter?: User }, obj2?: { id?: number; title?: string; type?: "html" | "faq" | "slides" | "tiles" }, obj3?: {photos?: File[]}) {
    super(obj, obj2);
    if ( obj3 != null ) {
      this.photos = obj3.photos;
    }
  }
}

// Section pour agenda / sponsors...
// type = 'tiles'
export class EventsTilesSection extends Section {
  events: EventTile[];

  constructor(obj?: { createdAt?: Date; updatedAt?: Date; lastWriter?: User }, obj2?: { id?: number; title?: string; type?: "html" | "faq" | "slides" | "tiles" }, obj3?: {events?: EventTile[]}) {
    super(obj, obj2);
    if( obj3 != null ) {
      this.events = obj3.events;
    }
  }
}
