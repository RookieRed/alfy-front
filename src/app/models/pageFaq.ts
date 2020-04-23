export class Faq {
  public name: string;
  public sections: Section[];


  public constructor(obj?: {name?: string, sections?: {[key: string]: Section}, }) {
    if (obj != null) {
      this.name = obj.name;
      this.sections = Object.values(obj.sections);
    }
  }

}

export class Section {
  public html: string;
  public files: string[];
  public type: string;
  public id: number;
  public updatedAt: string;
  public lastWriter: string;
  public title: string;
  public orderIndex: number;
  public categories: Category[];

  public constructor(obj?: {html?: string,
                            files: string[],
                            type: string,
                            id: number,
                            updatedAt: string,
                            lastWriter: string,
                            title: string,
                            orderIndex: number,
                            categories: Category[],
                           }) {
    if (obj != null) {
      this.html = obj.html;
      this.files = obj.files;
      this.type = obj.type;
      this.id = obj.id;
      this.updatedAt = obj.updatedAt;
      this.lastWriter = obj.lastWriter;
      this.title = obj.title;
      this.orderIndex = obj.orderIndex;
      this.categories = obj.categories;
    }
  }

}

export class Category {
  id: number;
  name: string;
  description: string;
  orderIndex: number;
  questions: Question[];

  public constructor(obj?: {id?: number,
    name?: string,
    description?: string,
    orderIndex?: number,
    questions?: Question[]}) {
      if (obj != null) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.orderIndex = obj.orderIndex;
        this.questions = obj.questions;
      }
    }
}

export class CategoryUpdate {
  id: number;
  name: string;
  description: string;
  orderIndex: number;
  sectionId: number;

  public constructor(obj?: {id?: number,
    name?: string,
    description?: string,
    orderIndex?: number,
    sectionId?: number}) {
      if (obj != null) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.orderIndex = obj.orderIndex;
        this.sectionId = obj.sectionId;
      }
    }
}

export class CategoryAdd {
  name: string;
  description: string;
  sectionId: number;

  public constructor(obj?: {name?: string,
    description?: string,
    sectionId?: number}) {
      if (obj != null) {
        this.name = obj.name;
        this.description = obj.description;
        this.sectionId = obj.sectionId;
      }
    }
}

export class Question {
  id: number;
  question: string;
  answer: string;

  public constructor(obj?: {id?: number,
    question?: string,
    answer?: string,}) {
      if (obj != null) {
      this.id = obj.id;
      this.question = obj.question;
      this.answer = obj.answer;
      }
    }
}

export class QuestionAdd {
  question: string;
  answer: string;
  categoryId: number;

  public constructor(obj?: {
    question?: string,
    answer?: string,
    categoryId?: number, }) {
      if (obj != null) {
      this.question = obj.question;
      this.answer = obj.answer;
      this.categoryId = obj.categoryId;
      }
    }
}

export class QuestionUpdate {
  id: number;
  question: string;
  answer: string;
  categoryId: number;

  public constructor(obj?: {id?: number,
    question?: string,
    answer?: string,
    categoryId?: number,}) {
      if (obj != null) {
      this.id = obj.id;
      this.question = obj.question;
      this.answer = obj.answer;
      this.categoryId = obj.categoryId;
      }
    }
}


