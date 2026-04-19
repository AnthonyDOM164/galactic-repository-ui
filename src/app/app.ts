import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesList} from './components/species-list/species-list';
import {SpeciesForm} from './components/species-form/species-form';
import {TournamentRanking} from './components/tournament-ranking/tournament-ranking';
import {SpeciesService} from './services/species.service';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SpeciesList, SpeciesForm, TournamentRanking, CommonModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  private speciesService = inject(SpeciesService);

  ngOnInit(): void {
    this.speciesService.triggerRefresh();
  }
}
