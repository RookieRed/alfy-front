import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  panels = [
    {
    category: 'Inscription',
    question: 'Comment devenir membre officiel d ALFY ?',
    response: 'On devient membre de l’ALFY après s’être acquitté d’une cotisation d’un certain montant. Pour recueillir les cotisations, il faut passer via le site Helloasso qui se charge ensuite de reverser le tout compte bancaire d ALFY.'
  },
  {
    category: 'Entrer en contact avec des membres',
    question: 'Comment rechercher des membres d ALFY ?',
    response: 'Vous pouvez consulter les profils utilisateurs des membres grâce à la barre de recherche.'
  },

  {
    category: 'Catégorie 3',
    question: 'Comment rechercher des membres d ALFY ?',
    response: 'Vous pouvez consulter les profils utilisateurs des membres grâce à la barre de recherche.'
  }, 

  {
    category: 'Catégorie 4',
    question: 'Comment rechercher des membres d ALFY ?',
    response: 'Vous pouvez consulter les profils utilisateurs des membres grâce à la barre de recherche.'
  }, 

  {
    category: 'Catégorie 5',
    question: 'Comment rechercher des membres d ALFY ?',
    response: 'Vous pouvez consulter les profils utilisateurs des membres grâce à la barre de recherche.'
  }, 

  {
    category: 'Catégorie 6',
    question: 'Comment rechercher des membres d ALFY ?',
    response: 'Vous pouvez consulter les profils utilisateurs des membres grâce à la barre de recherche.'
  }
  ]

  constructor() { }

  ngOnInit() {
  }

}
