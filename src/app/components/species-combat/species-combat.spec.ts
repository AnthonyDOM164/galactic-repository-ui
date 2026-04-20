import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesCombat } from './species-combat';
import { SpeciesService } from '../../services/species.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('SpeciesCombat Component', () => {
  let component: SpeciesCombat;
  let fixture: ComponentFixture<SpeciesCombat>;
  let speciesServiceMock: any;

  beforeEach(async () => {
    speciesServiceMock = {
      getSpecies: () => of([
        { id: 1, name: 'Humano', powerLevel: 250, specialAbility: 'Super fuerza', victories: 0 },
        { id: 2, name: 'Robot', powerLevel: 250, specialAbility: 'Super inteligencia', victories: 0 }
      ]),
      startCombat: () => of({
        winner: { id: 1, name: 'Humano', powerLevel: 250 }
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        SpeciesCombat,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: SpeciesService, useValue: speciesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesCombat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de especies para combatir', () => {
    expect(component.speciesList.length).toBe(2);
  });
});
