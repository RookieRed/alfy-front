import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FaqService} from '../../services/faq.service';
import {Category, FAQPage, Question} from '../../models/pageFaq';


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
  modifCategoryForm: FormGroup;
  categoryForm: FormGroup;
  categorieAdd: boolean;
  panelOpenState: boolean;
  faqSectionId: number;

  constructor(private fb: FormBuilder, private faqService: FaqService) {
    this.questionListOE = [];
    this.categoryListOE = [];
    this.categoriesAddQuestion = [];
    this.categorieAdd = false;
    this.panelOpenState = false;
  }

  getFaq() {
    this.faqService.getFAQ().then((resp: any) => {
      const respObj = new FAQPage(resp);
      this.faqSectionId = respObj.sections['main-faq'].id;
      this.categories = respObj.sections['main-faq'].categories;
      this.intro = respObj.sections['faq-intro'].html;
    }, console.error);
  }

  async ngOnInit() {
    await this.getFaq();
    this.questionForm = this.fb.group({
      newQuestion: [],
      newAnswer: [],
    });
    this.modifQuestionForm = this.fb.group({
      modifQuestion: [],
      modifAnswer: [],
    });
    this.categoryForm = this.fb.group({
      newCategoryName: [],
    });
    this.modifCategoryForm = this.fb.group({
      modifCategoryName: [],
    });
  }

  // Function for buttons

  // ________________CATEGORIES___________

  categoryModifZone(categorie) {
    // Affichage de la zone de modification
    this.categoryListOE.push(categorie);
    this.panelOpenState = true;
  }

  cancelModifCategory(categorie) {
    // Annule les modifiactions
    const index = this.categoryListOE.indexOf(categorie);
    this.categoryListOE.splice(index, 1);
  }

  saveUpdateCategory(categorie) {
    // Enregistre les modifications
    if (this.modifCategoryForm.value.modifCategoryName == null) {
      this.modifCategoryForm.value.modifCategoryName = categorie.name;
    }
    categorie.name = this.modifCategoryForm.value.modifCategoryName;

    const categorieUpdate = <Category> {
      id: categorie.id,
      name: categorie.name,
      description: categorie.description,
      sectionId: this.faqSectionId
    };

    const index = this.categoryListOE.indexOf(categorie);
    this.categoryListOE.splice(index, 1);

    this.faqService.updateCategory(categorieUpdate).toPromise().then(
      res => {
        this.categories.splice(index, 1, res);
        return res;
      }).catch(console.error);
  }

  // Suppression d'une categorie
  deleteCategory(categorie) {
    this.faqService.deleteCategory(categorie).toPromise().then(
      res => {
        this.categories = this.categories.filter(category => category.id !== categorie.id);
        return res;
      }).catch(console.error);
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
    if (this.categoryForm.value.newCategoryName == null) {
      alert("Vous devez écrire une catégorie");
      return;
    }
    const newCategory = <Category> {
      name: this.categoryForm.value.newCategoryName,
      sectionId: this.faqSectionId
    };
    this.faqService.addCategory(newCategory).toPromise().then(
      res => {
        this.categories.push(res);
      }).catch(console.error);
    this.categorieAdd = false;
  }

  // ________________QUESTIONS____________

  // Modifications des questions
  questionZoneEdit(question) {
    // Affichage de la zone de modification
    this.questionListOE.push(question);
  }

  saveUpdateQuestion(categorie, question) {
    // Enregistre les modifications
    if (this.modifQuestionForm.value.modifQuestion == null) {
      this.modifQuestionForm.value.modifQuestion = question.question;
    }
    if (this.modifQuestionForm.value.modifAnswer == null) {
      this.modifQuestionForm.value.modifAnswer = question.answer;
    }

    const questionUpdate = <Question> {
      id: question.id,
      answer: this.modifQuestionForm.value.modifAnswer,
      question: this.modifQuestionForm.value.modifQuestion,
      categoryId: categorie.id,
    };
    this.faqService.updateQuestion(questionUpdate).toPromise().then(
      res => {
        var index = this.categories.indexOf(categorie);
        categorie.questions.forEach(questionFor => {
          if (questionFor.id === questionUpdate.id) {
            var index2 = categorie.questions.indexOf(questionFor);
            categorie.questions.splice(index2, 1, res);
          }
        });
        this.categories.splice(index, 1, categorie);
        return res;
      }).catch(console.error);

    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }

  cancelModifQuestion(question) {
    // Annule les modifiactions
    const index = this.questionListOE.indexOf(question);
    this.questionListOE.splice(index, 1);
  }

  // Suppression d'une question
  deleteQuestion(categorie, question) {
    this.faqService.deleteQuestion(question).toPromise().then(
      res => {
        var index = this.categories.indexOf(categorie);
        categorie.questions = categorie.questions.filter(questionFor => questionFor.id != question.id);
        this.categories.splice(index, 1, categorie);
        return res;
      }).catch(console.error);
  }


  // Ajout d'une question
  questionZoneAdd(categorie) {
    // Affichage de la zone d'ajout d'une question
    this.categoriesAddQuestion.push(categorie.id);
  }

  validationAddQuestion(categorie) {
    // Validation de la nouvelle question
    if (this.questionForm.value.newQuestion == null) {
      alert("Vous devez écrire une question");
      return;
    }
    if (this.questionForm.value.newAnswer == null) {
      alert("Vous devez écrire une réponse");
      return;
    }
    var newQuestion = new Question();
    newQuestion.question = this.questionForm.value.newQuestion;
    newQuestion.answer = this.questionForm.value.newAnswer;
    newQuestion.categoryId = categorie.id;
    this.faqService.addQuestion(newQuestion).toPromise().then(
      res => {
        var index = this.categories.indexOf(categorie);
        categorie.questions.push(res);
        this.categories.splice(index, 1, categorie);
        return res;
      }).catch(console.error);

    // Fais disparaitre l'espace d'édition d'une nouvelle question
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }

  conceledAddQuestion(categorie) {
    // Annulation de l'ajout
    const index = this.categoriesAddQuestion.indexOf(categorie.id);
    this.categoriesAddQuestion.splice(index, 1);
  }

  // ________________Position des Questions___________

  /*
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
  */

}
