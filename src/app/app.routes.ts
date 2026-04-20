import { Routes } from '@angular/router';
import {TournamentRanking} from './components/tournament-ranking/tournament-ranking';
import {SpeciesCombat} from './components/species-combat/species-combat';

export const routes: Routes = [
  { path: 'ranking', component: TournamentRanking },
  { path: 'combat', component: SpeciesCombat },
  { path: '', redirectTo: '/ranking', pathMatch: 'full' }
];
