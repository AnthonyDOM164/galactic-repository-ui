import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpeciesService} from '../../services/species.service';
import {Species} from '../../models/species.model';
import {TranslateModule} from '@ngx-translate/core';

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

  ngOnInit(): void {
    this.speciesService.refresh$.subscribe(() => {
      this.loadSpecies();
    });
  }

  loadSpecies() {
    this.speciesService.getSpecies().subscribe(data => {
      this.species = data;
    });
  }
}
