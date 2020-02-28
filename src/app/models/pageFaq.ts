export class Faq {
  public html: string;
  public categories: Category[];

  public constructor(obj?: {html?: string, }) {
      if (obj != null) {
      this.html = obj.html;
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
    orderIndex?: number, }) {
      if (obj != null) {
      this.id = obj.id;
      this.name = obj.name;
      this.description = obj.description;
      this.orderIndex = obj.orderIndex;
      }
    }
}

export class Question {
  id: number;
  question: string;
  answer: string;
  orderIndex: number;

  public constructor(obj?: {id?: number,
    question?: string,
    answer?: string,
    orderIndex?: number, }) {
      if (obj != null) {
      this.id = obj.id;
      this.question = obj.question;
      this.answer = obj.answer;
      this.orderIndex = obj.orderIndex;
      }
    }
}


