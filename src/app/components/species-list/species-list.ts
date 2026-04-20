import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../models/species.model';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Component responsible for displaying the complete list of registered species.
 * Reacts automatically to global data changes to keep the view updated.
 */
@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './species-list.html',
})
export class SpeciesList implements OnInit {
  private speciesService = inject(SpeciesService);
  species: Species[] = [];

  /**
   * Subscribes to the global refresh stream to trigger data reloads whenever
   * a new species is added or a combat finishes.
   */
  ngOnInit(): void {
    this.speciesService.refresh$.subscribe(() => {
      this.loadSpecies();
    });
  }

  /**
   * Fetches the latest species data from the backend and updates the local state.
   */
  loadSpecies() {
    this.speciesService.getSpecies().subscribe(data => {
      this.species = data;
    });
  }
}
