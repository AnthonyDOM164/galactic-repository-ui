import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../models/species.model';

@Component({
  selector: 'app-species-combat',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
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

  ngOnInit() {
    this.speciesService.getSpecies().subscribe(data => this.speciesList = data);
  }

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
