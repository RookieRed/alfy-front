import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FaqService } from '../../services/faq.service';
import { Faq, Category, Question } from '../../models/pageFaq';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  categories: Category[];
  questions: Question[];
  intro: string;
  questionOnEdit: boolean;
  questionListOE: Question[];
  newQuestion: boolean;

  private onApiError(err) {
    console.error(err);
  }

  constructor(private faqService: FaqService) {
    this.questionOnEdit = false;
    this.questionListOE = new Array<Question>();
    this.newQuestion = false;
  }

  async getFaq() {
    await this.faqService.getFAQ().then((resp: any) => {
      const respObj = resp;
      this.categories = <Category[]>respObj.sections[1].categories;
      console.log(respObj.sections[0].html);

      this.intro = (new DOMParser().parseFromString(respObj.sections[0].html, "text/xml")).firstChild.textContent;
      console.log(this.intro);
    }, err => {
      this.onApiError(err);
    });
  }

 async  ngOnInit() {
    await this.getFaq();
  }


  // Function for buttons

  // Pour l'instant elles envoient juste un message sur la console de F12

  questionEdit(question) {
    this.questionOnEdit = true;
    this.questionListOE.push(question);
    console.log("ID = " + question.id);
  }

  cancelMQ(question) {
    if ( this.questionListOE.length <= 1 ) {
      this.questionOnEdit = false;
    }
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }

  deleteQuestion(question) {
    this.faqService.deleteQuestion(question).subscribe();
    console.log("Vous avez appuyé supprime " + question.id);
  }

  addQuestion() {
    this.newQuestion = true;
  }
  editionMode() {
    console.log("Vous avez appuyé pour passer en mode édition! Une fonction sera bientôt implémenter pour cela.");
  }

  delete() {
    console.log("Vous avez appuyé sur supprimer! Une fonction sera bientôt implémenter pour cela.");
  }

  questionDownward() {
    console.log("Vous avez appuyé sur la flêche du haut! Une fonction sera bientôt implémenter pour cela.");
  }

  questionUpward() {
    console.log("Vous avez appuyé sur la flêche du bas! Une fonction sera bientôt implémenter pour cela.");
  }

  cancellation() {
    console.log("Vous avez appuyé sur annuler! Une fonction sera bientôt implémenter pour cela.");
  }

  submit(){
    console.log("Vous avez appuyé sur soumettre! Une fonction sera bientôt implémenter pour cela.");
  }
}
