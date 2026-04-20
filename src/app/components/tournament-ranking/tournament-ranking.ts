import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesService } from '../../services/species.service';
import { Species } from '../../models/species.model';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-tournament-ranking',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './tournament-ranking.html',
  styles: [`
    .gold { color: #ffd700; font-weight: bold; }
    .silver { color: #c0c0c0; font-weight: bold; }
    .bronze { color: #cd7f32; font-weight: bold; }
  `]
})

export class TournamentRanking implements OnInit {
  private speciesService = inject(SpeciesService);
  ranking: Species[] = [];

  ngOnInit(): void {
    this.loadRanking();
    this.speciesService.refresh$.subscribe(() => {
      this.loadRanking();
    });
  }

  loadRanking(): void {
    this.speciesService.getRanking().subscribe(data => this.ranking = data);
  }
}
