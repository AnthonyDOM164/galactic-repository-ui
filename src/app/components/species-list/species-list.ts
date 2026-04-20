import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
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
export class SpeciesList {
  private speciesService = inject(SpeciesService);
  readonly species = toSignal(this.speciesService.species$, {
    initialValue: [] as Species[]
  });
}
