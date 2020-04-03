import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, MaxLengthValidator} from '@angular/forms';
import { FaqService } from '../../services/faq.service';
import { Faq, Category, Question, QuestionAdd, QuestionUpdate, CategoryAdd, CategoryUpdate} from '../../models/pageFaq';


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
  categoryListOE: Category[];
  categoriesAddQuestion: number[];
  questionForm: FormGroup;
  modifQuestionForm: FormGroup;
  modifCategoryForm: FormGroup;             // Tout reformuler
  categoryForm: FormGroup;
  categorieAdd: boolean;

  private onApiError(err) {
    console.error(err);
  }

  constructor(private fb: FormBuilder, private faqService: FaqService) {
    this.questionListOE = new Array<Question>();
    this.categoryListOE = new Array<Category>();
    this.categoriesAddQuestion = new Array<number>();
    this.categorieAdd = false;
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
    this.modifQuestionForm = this.fb.group({
      modifQuestion: [],
      modifAnswer: [],
    })
    this.categoryForm = this.fb.group({
      newCategoryName: [],
    })
    this.modifCategoryForm = this.fb.group({
      modifCategoryName: [],
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

  //________________CATEGORIES___________

  categoryModifZone(categorie) {                          // voir si je garde ce nom où si je copie celle de question
    // Affichage de la zone de modification
    this.categoryListOE.push(categorie);
  }

  saveUpdateCategory(categorie) {                       // changer valide par check ?
    // Enregistre les modifications
    if (this.modifCategoryForm.value.modifCategoryName == null) {
      this.modifCategoryForm.value.modifCategoryName = categorie.name ;
    }
    categorie.name  = this.modifCategoryForm.value.modifCategoryName;

    var categorieUpdate = new CategoryUpdate();
    categorieUpdate.id = categorie.id;
    categorieUpdate.name = categorie.name;
    categorieUpdate.description = categorie.question;
    categorieUpdate.orderIndex = categorie.orderIndex;
    categorieUpdate.sectionId = 7;
    this.faqService.updateCategory(categorieUpdate).subscribe();
    const index = this.categoryListOE.indexOf(categorie);
    this.categoryListOE.splice(index, 1);
  }

  cancelModifCategory(categorie) {
    // Annule les modifiactions
    const index = this.categoryListOE.indexOf(categorie);
    this.categoryListOE.splice(index, 1);
  }

  // Suppression d'une categorie
  deleteCategory(categorie) {
    this.faqService.deleteCategory(categorie).subscribe();
    console.log("Vous avez appuyé supprime " + categorie.id);
  }

  // Ajout d'une categorie
  categoryZoneAdd() {
    // Afficher la zone d'ajout d'une catégorie
    this.categorieAdd = true;
  }

  conceledAddCategory() {
    // Annuler l'ajout d'une catégorie
    this.categorieAdd = false;
  }

  validationAddCategory() {
    console.log("Vous avez appuyer sur Valider!")
    var newCategory = new CategoryAdd();
    newCategory.name =  this.categoryForm.value.newCategoryName;
    newCategory.description = null;
    newCategory.sectionId = 7;
    var result = this.faqService.addCategory(newCategory).subscribe();
    this.categorieAdd = false;
    console.log(result)
  }

  //________________QUESTIONS____________

  // Modifications des questions
  questionZoneEdit(question) {
    // Affichage de la zone de modification
    this.questionListOE.push(question);
  }

  saveUpdateQuestion(categorie, question) {
    // Enregistre les modifications
    if (this.modifQuestionForm.value.modifQuestion == null) {
      this.modifQuestionForm.value.modifQuestion = question.question ;
    }
    if (this.modifQuestionForm.value.modifAnswer == null) {
      this.modifQuestionForm.value.modifAnswer = question.answer;
    }
    question.question = this.modifQuestionForm.value.modifQuestion;
    question.answer = this.modifQuestionForm.value.modifAnswer;
    
    var questionUpdate = new QuestionUpdate();
    questionUpdate.id = question.id;
    questionUpdate.answer = question.answer;
    questionUpdate.question = question.question;
    questionUpdate.categoryId = categorie.id;
    questionUpdate.orderIndex = question.orderIndex;
    this.faqService.updateQuestion(questionUpdate).subscribe();
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }
  
  cancelModifQuestion(question) {
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
    if (this.questionForm.value.newAnswer == null) {
      this.questionForm.value.newAnswer = "Pas de réponse pour l'instant";
    }
    if (this.questionForm.value.newQuestion == null) {
      alert("Vous devez écrire une question");
      return;
    }
    var newQuestion = new QuestionAdd();
    newQuestion.question =  this.questionForm.value.newQuestion;
    console.log("question = ",this.questionForm.value.newQuestion)
    newQuestion.answer = this.questionForm.value.newAnswer;
    console.log("newAnswer = ",this.questionForm.value.newAnswer)
    newQuestion.categoryId = categorie.id;
    console.log("categorie.id = ",categorie.id)
    this.faqService.addQuestion(newQuestion).subscribe();
    // Fais disparaitre l'espace d'édition d'une nouvelle question                    // Pourrait être remplacer par conceledAddQuestion(categorie) 
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }
  conceledAddQuestion(categorie) {                                                    // closedEditZoneAddQuestion ???        
    // Annulation de l'ajout 
    console.log("Vous avez appuyer sur Supprimer!")
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }

  //________________Position des Questions___________

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