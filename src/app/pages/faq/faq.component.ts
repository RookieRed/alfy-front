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

  private onApiError(err) {
    console.error(err);
    //TODO
  }

  constructor(private faqService: FaqService) { }

  getCategories(): void {
    this.faqService.getCategories().then((resp: any) => {
      const respObj = resp;
      this.categories = <Category[]>respObj.categories;
      this.questions = <Question[]>respObj.questions;
      this.intro = respObj.html;
    }, (err) => {
      this.onApiError(err);
    })
  }

  ngOnInit() {
    this.getCategories();
  }


  // Function for buttons

  // Pour l'instant elles envoient juste un message sur la console de F12

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
