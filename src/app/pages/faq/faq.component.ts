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
  }

  constructor(private faqService: FaqService) { }

  getFaq(): void {
    this.faqService.getFAQ().then((resp : any) => {
      const respObj = resp;
      console.log("Html = " + respObj.html);
      this.categories = <Category[]>respObj.categories;
      this.questions = <Question[]>respObj.questions;
      this.intro = respObj;
    }, err => {
      this.onApiError(err);
    });
  }

  ngOnInit() {
    this.getFaq();
    console.log("Categories = " + this.faqService.getFAQ());
    //this.categories[0].
  }

}
