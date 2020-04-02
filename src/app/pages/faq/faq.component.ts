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
  modificationForm: FormGroup;
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
    this.categoryForm = this.fb.group({
      newCategoryName: [],
    })
    this.modifCategoryForm = this.fb.group({
      modifCategoryName: [],
    })
  }


  // Function for buttons

  //________________CATEGORIES___________

categoryModifZone(categorie) {                          // voir si je garde ce nom où si je copie celle de question
  // Affichage de la zone de modification
  this.categoryListOE.push(categorie);
}

validationMC(categorie) {                       // changer valide par check ?
  // Enregistre les modifications
  if (this.modifCategoryForm.value.modifCategoryName == null) {
    this.modifCategoryForm.value.modifCategoryName = categorie.name ;
  }
  categorie.name  = this.modifCategoryForm.value.modifCategoryName;

  var categorieModifie = new CategoryUpdate();
  categorieModifie.id = categorie.id;
  categorieModifie.name = categorie.name;
  categorieModifie.description = categorie.question;
  categorieModifie.orderIndex = categorie.orderIndex;
  categorieModifie.sectionId = 7;
  this.faqService.updateCategory(categorieModifie).subscribe();
  const index = this.categoryListOE.indexOf(categorie);
  this.categoryListOE.splice(index, 1);
}

cancelMC(categorie) {
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
    var questionModifie = new QuestionUpdate();
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
    if (this.modificationForm.value.modifAnswer == null) {
      this.questionForm.value.newAnswer = "Pas de réponse pour l'instant";
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
}
