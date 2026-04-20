import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SpeciesService } from './species.service';
import { environment } from '../../environments/environment';

describe('SpeciesService', () => {
  let service: SpeciesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SpeciesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SpeciesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de especies (GET)', () => {
    const mockSpecies = [
      { id: 1, name: 'Humano', powerLevel: 260, specialAbility: 'Super Fuerza', victories: 0}
    ];

    service.getSpecies().subscribe(species => {
      expect(species.length).toBe(1);
      expect(species).toEqual(mockSpecies);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecies);
  });
});
