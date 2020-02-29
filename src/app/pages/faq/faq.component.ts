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

}
