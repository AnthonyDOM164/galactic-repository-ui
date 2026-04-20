import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../models/species.model';

/**
 * Component that facilitates manual and random combats between species.
 */
@Component({
  selector: 'app-species-combat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './species-combat.html'
})
export class SpeciesCombat implements OnInit {
  speciesList: Species[] = [];
  id1?: number;
  id2?: number;
  winner: any = null;
  loading = false;

  constructor(private speciesService: SpeciesService) {
  }

  /**
   * Initializes the component by fetching the initial list of species.
   */
  ngOnInit() {
    this.speciesService.getSpecies().subscribe(data => this.speciesList = data);
  }

  /**
   * Validates and executes a combat between the two selected species.
   * @returns {void}
   */
  onFight() {
    if (this.speciesList.length < 2) return;

    this.loading = true;
    this.speciesService.startCombat(this.id1, this.id2).subscribe({
      next: (res) => {
        this.winner = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  /**
   * Selects two random different species and triggers a combat.
   */
  onRandomFight() {
    if (this.speciesList.length < 2) return;

    this.loading = true;
    this.speciesService.startRandomCombat().subscribe({
      next: (res) => {
        this.winner = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
