import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentRanking } from './tournament-ranking';
import { SpeciesService } from '../../services/species.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('TournamentRanking Component', () => {
  let component: TournamentRanking;
  let fixture: ComponentFixture<TournamentRanking>;
  let speciesServiceMock: any;

  beforeEach(async () => {
    speciesServiceMock = {
      refresh$: of(undefined),
      getRanking: () => of([
        { speciesName: 'Humano', victories: 15 },
        { speciesName: 'Robot', victories: 3 }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [
        TournamentRanking,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: SpeciesService, useValue: speciesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentRanking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el ranking al iniciar', () => {
    expect(component.ranking.length).toBe(2);
    expect(component.ranking[0].victories).toBe(15);
  });
});
