import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesList } from './species-list';
import { SpeciesService } from '../../services/species.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('SpeciesList Component', () => {
  let component: SpeciesList;
  let fixture: ComponentFixture<SpeciesList>;
  let speciesServiceMock: any;

  beforeEach(async () => {
    speciesServiceMock = {
      refresh$: of(undefined),
      getSpecies: () => of([
        { id: 1, name: 'Humano', powerLevel: 260, specialAbility: 'Super fuerza', victories: 0 }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [
        SpeciesList,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: SpeciesService, useValue: speciesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las especies al iniciar (ngOnInit)', () => {
    expect(component.species.length).toBe(1);
    expect(component.species[0].name).toBe('Humano');
  });
});
