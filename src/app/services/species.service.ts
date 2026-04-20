import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Species } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiUrl = 'https://galactic-repository-api.onrender.com/api/species';

  private refreshNeeded$ = new BehaviorSubject<void>(undefined)

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  triggerRefresh() {
    this.refreshNeeded$.next();
  }

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  getRanking(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/ranking`);
  }

  registerSpecies(species: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }

  battle(id1: number, id2: number): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle?id1=${id1}&id2=${id2}`, {});
  }

}
