import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, MaxLengthValidator} from '@angular/forms';
import { FaqService } from '../../services/faq.service';
import { Faq, Category, Question, QuestionAdd, QuestionModifie } from '../../models/pageFaq';


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
    this.sortQuestions();
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

  sortQuestions() {
    for(let c of this.categories) {
      var index = 0;
      for(let q of c.questions) {
        q.id = index;
        index++;
      }
    }
  }


  // Function for buttons

  // Modifications des questions
  questionZoneEdit(question) {
    // Affichage de la zone de modification
    this.questionListOE.push(question);
  }
  validationMQ(categorie, question) {
    // Enregistre les modifications
    if (this.modificationForm.value.modifQuestion == null) {
      this.modificationForm.value.modifQuestion = question.question ;
    }
    if (this.modificationForm.value.modifAnswer == null) {
      this.modificationForm.value.modifAnswer = question.answer;
    }
    question.question = this.modificationForm.value.modifQuestion;
    question.answer = this.modificationForm.value.modifAnswer;
    var questionModifie = new QuestionModifie();
    questionModifie.id = question.id;
    questionModifie.answer = question.answer;
    questionModifie.question = question.question;
    questionModifie.categoryId = categorie.id;
    questionModifie.orderIndex = question.orderIndex;
    this.faqService.updateQuestion(questionModifie).subscribe();
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }
  cancelMQ(question) {
    // Annule les modifiactions
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }

  // Suppression d'une question
  deleteQuestion(question) {
    this.faqService.deleteQuestion(question).subscribe();
    console.log("Vous avez appuyé supprime " + question.id);
  }
  // Ajout d'une question
  questionZoneAdd(categorie) {
    // Affichage de la zone d'ajout d'une question
    console.log("Voici la catégorie envoyée : "+ categorie.id);
    this.categoriesAddQuestion.push(categorie.id);
    console.log("Voici la liste des catégories : " + this.categoriesAddQuestion);
  }
  validationAddQuestion(categorie) {
    // Validation de la nouvelle question
    console.log("Vous avez appuyer sur Valider!")
    var newQuestion = new QuestionAdd();
    newQuestion.question =  this.questionForm.value.newQuestion;
    newQuestion.answer = this.questionForm.value.newAnswer;
    newQuestion.categoryId = categorie.id;
    this.faqService.addQuestion(newQuestion).subscribe();
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
  conceledAddQuestion(categorie) {
    // Annulation de l'ajout 
    console.log("Vous avez appuyer sur Supprimer!")
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }

  questionDownward(categorie, question) {
    // Monter question 
    console.log("Vous avez appuyer sur down!");

    if (question.id != categorie.questions.length-1){
      var question_temp : Question = new Question();
      var id_question_temp : number;
      question_temp = question;
      id_question_temp = question.id;
      categorie.questions[question.id] = categorie.questions[question.id+1];
      categorie.questions[question.id].id = id_question_temp;
      categorie.questions[question.id+1] = question_temp;
      categorie.questions[question.id+1].id =id_question_temp+1;
    }
  }
  
  questionUpward(categorie, question) {
    // descendre qustion 
    console.log("Vous avez appuyer sur up!");
    
    if (question.id != 0){
      var question_temp : Question = new Question();
      var id_question_temp : number;
      question_temp = question;
      id_question_temp = question.id;
      categorie.questions[question.id] = categorie.questions[question.id-1];
      categorie.questions[question.id].id = id_question_temp;
      categorie.questions[question.id-1] = question_temp;
      categorie.questions[question.id-1].id =id_question_temp-1;
    }
  }

}
