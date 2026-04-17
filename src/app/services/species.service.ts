import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Species } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiUrl = 'https://galactic-repository-api.onrender.com/api/species';

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  registerSpecies(species: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }
}
