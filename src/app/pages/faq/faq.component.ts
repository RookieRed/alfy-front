import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
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
  questionListOE: Question[];
  categoriesAddQuestion: number[];
  questionForm: FormGroup;

  private onApiError(err) {
    console.error(err);
  }

  constructor(private fb: FormBuilder, private faqService: FaqService) {
    this.questionListOE = new Array<Question>();
    this.categoriesAddQuestion = new Array<number>();
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
    this.questionForm = this.fb.group({
      newQuestion: [],
      newAnswer: [],
    })
  }


  // Function for buttons

  questionEdit(question) {
    this.questionListOE.push(question);
    console.log("ID = " + question.id);
  }

  cancelMQ(question) {
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }

  deleteQuestion(question) {
    this.faqService.deleteQuestion(question).subscribe();
    console.log("Vous avez appuyé supprime " + question.id);
  }
  // Ajout d'une question
  addQuestion(categorie) {
    console.log("Voici la catégorie envoyée : "+ categorie.id);
    this.categoriesAddQuestion.push(categorie.id);
    console.log("Voici la liste des catégories : " + this.categoriesAddQuestion);
  }
  validationAddQuestion(categorie) {
    console.log("Vous avez appuyer sur Valider!")
    console.log("Affichons la nouvelle question : "+ this.questionForm.value.newQuestion);
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
  conceledAddQuestion(categorie) {
    console.log("Vous avez appuyer sur Supprimer!")
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
}
