import {Component, EventEmitter, Output, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {SpeciesService} from '../../services/species.service';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Component providing the form interface to register a new galactic species.
 * Includes validation and handles API submission state.
 */
@Component({
  selector: 'app-species-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './species-form.html'
})
export class SpeciesForm {
  private fb = inject(FormBuilder);
  private speciesService = inject(SpeciesService);

  @Output() speciesCreated = new EventEmitter<void>();
  loading = false;

  speciesForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    powerLevel: [150, [Validators.required, Validators.min(1), Validators.max(300)]],
    specialAbility: ['', [Validators.required, Validators.maxLength(50)]]
  });

  /**
   * Validates the form data and sends a request to register a new species.
   * Resets the form upon successful creation.
   * @returns {void}
   */
  onSubmit() {
    if (this.speciesForm.valid) {
      this.loading = true;
      this.speciesService.registerSpecies(this.speciesForm.value).subscribe({
        next: () => {
          this.speciesService.notifyRefresh();
          this.loading = false;
          this.speciesForm.reset({powerLevel: 150});
          this.speciesCreated.emit();
        },
        error: (err) => {
          this.loading = false;
          console.error('Error:', err);
        }
      });
    }
  }

  isInvalid(field: string) {
    const control = this.speciesForm.get(field);
    return control?.invalid && (control?.touched || control?.dirty);
  }
}
