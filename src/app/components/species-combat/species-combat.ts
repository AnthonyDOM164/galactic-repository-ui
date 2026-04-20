import {Component, inject, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
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
export class SpeciesCombat {
  private speciesService = inject(SpeciesService);

  readonly speciesList = toSignal(this.speciesService.species$, {
    initialValue: [] as Species[]
  });
  readonly winner = signal<Species | null>(null);
  readonly loading = signal(false);
  id1?: number;
  id2?: number;

  /**
   * Validates and executes a combat between the two selected species.
   * @returns {void}
   */
  onFight() {
    if (this.speciesList().length < 2 || !this.id1 || !this.id2) return;

    this.loading.set(true);
    this.speciesService.startCombat(this.id1, this.id2).subscribe({
      next: (res) => {
        this.winner.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  /**
   * Selects two random different species and triggers a combat.
   */
  onRandomFight() {
    if (this.speciesList().length < 2) return;

    this.loading.set(true);
    this.speciesService.startRandomCombat().subscribe({
      next: (res) => {
        this.winner.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
