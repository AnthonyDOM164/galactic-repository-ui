import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Species} from '../models/species.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiUrl = environment.apiUrl;

  private _refresh$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {
  }

  get refresh$() {
    return this._refresh$.asObservable();
  }

  notifyRefresh() {
    this._refresh$.next();
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  getRanking(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/ranking`);
  }

  registerSpecies(species: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }

  startCombat(id1: number | undefined, id2: number | undefined): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle?id1=${id1}&id2=${id2}`, {});
  }

  startRandomCombat(): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle/randomBattle`, {});
  }

}
