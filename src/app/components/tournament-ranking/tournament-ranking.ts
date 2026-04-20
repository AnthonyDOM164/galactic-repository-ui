import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../models/species.model';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Component that displays the tournament leaderboard.
 * Sorts and displays species based on their total number of victories.
 */
@Component({
  selector: 'app-tournament-ranking',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './tournament-ranking.html'
})
export class TournamentRanking {
  private speciesService = inject(SpeciesService);
  readonly ranking = toSignal(this.speciesService.ranking$, {
    initialValue: [] as Species[]
  });
}
