import {Component, OnInit, inject} from '@angular/core';
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
export class TournamentRanking implements OnInit {
  private speciesService = inject(SpeciesService);
  ranking: Species[] = [];

  /**
   * Subscribes to the global refresh stream to keep the leaderboard updated in real-time.
   */
  ngOnInit(): void {
    this.loadRanking();
    this.speciesService.refresh$.subscribe(() => {
      this.loadRanking();
    });
  }

  /**
   * Fetches the official ranking from the API and updates the view.
   */
  loadRanking(): void {
    this.speciesService.getRanking().subscribe(data => this.ranking = data);
  }
}
