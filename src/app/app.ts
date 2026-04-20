import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesList} from './components/species-list/species-list';
import {SpeciesForm} from './components/species-form/species-form';
import {TournamentRanking} from './components/tournament-ranking/tournament-ranking';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    TranslateModule,
    SpeciesList,
    SpeciesForm,
    TournamentRanking,
    CommonModule
  ],
  templateUrl: './app.html'
})

export class App {
  constructor(private translate: TranslateService) {
  this.translate.addLangs(['es', 'en']);
  this.translate.use('es');
}

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
