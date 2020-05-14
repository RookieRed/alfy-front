import {Page} from "./page";
import {FAQSection, HTMLSection} from "./sections";

export class FAQPage implements Page {
  name: string;
  sections: {
    'faq-intro': HTMLSection,
    'main-faq': FAQSection
  };
  title: string;

  public constructor(obj?: { name?: string, sections?: { 'faq-intro': HTMLSection, 'main-faq': FAQSection}, }) {
    if (obj != null) {
      this.name = obj.name;
      this.sections = obj.sections;
    }
  }

}

export class Category {
  id: number;
  name: string;
  description: string;
  questions: Question[];
  sectionId: number;

  public constructor(obj?: {
    id?: number,
    name?: string,
    description?: string,
    sectionId?: number,
    questions: Question[]
  }) {
    if (obj != null) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.sectionId = obj.sectionId;
      this.questions = obj.questions;
    }
  }
}

export class Question {
  id: number;
  question: string;
  answer: string;
  categoryId: number;

  public constructor(obj?: {
    id?: number,
    question?: string,
    answer?: string,
    categoryId?: number,
  }) {
    if (obj != null) {
      this.id = obj.id;
      this.question = obj.question;
      this.answer = obj.answer;
      this.categoryId = obj.categoryId;
    }
  }
}

