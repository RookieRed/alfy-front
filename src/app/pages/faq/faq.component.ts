import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, MaxLengthValidator} from '@angular/forms';
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
  modificationForm: FormGroup;

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
    this.modificationForm = this.fb.group({
      modifQuestion: [],
      modifAnswer: [],
    })
  }


  // Function for buttons

  questionEdit(question) {
    this.questionListOE.push(question);
    console.log("ID = " + question.id);
  }
  validationMQ(question) {
    question.question = this.modificationForm.value.modifQuestion;
    question.answer = this.modificationForm.value.modifAnswer;
    this.faqService.updateQuestion(question).subscribe();
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
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
    /*var maxId = 0;
    for(const c of this.categories){
      for (const q in c.questions){
        console.log("L'id de q est  : "+q.getId());
        if (q.id > maxId){
          maxId = q.id;
        };
      };
    };
    console.log("L'id max est : "+maxId);
    var newQuestion = new Question(12, this.questionForm.value.newQuestion, this.questionForm.value.newAnswer, categorie.id );
    this.faqService.addQuestion(newQuestion);*/
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
  conceledAddQuestion(categorie) {
    console.log("Vous avez appuyer sur Supprimer!")
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
}
