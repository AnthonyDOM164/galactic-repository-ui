import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesForm } from './species-form';
import { SpeciesService } from '../../services/species.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('SpeciesForm Component', () => {
  let component: SpeciesForm;
  let fixture: ComponentFixture<SpeciesForm>;
  let speciesServiceMock: any;

  beforeEach(async () => {
    speciesServiceMock = {
      registerSpecies: (data: any) => of({ id: 99, victories: 0, ...data })
    };

    await TestBed.configureTestingModule({
      imports: [
        SpeciesForm,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: SpeciesService, useValue: speciesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
