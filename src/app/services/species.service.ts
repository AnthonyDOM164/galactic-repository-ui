import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Species} from '../models/species.model';
import {environment} from '../../environments/environment';

/**
 * Service responsible for managing galactic species data and tournament logic.
 * Handles API communication and reactive state synchronization.
 */
@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private apiUrl = environment.apiUrl;

  private _refresh$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {
  }

  /**
   * Observable stream that notifies subscribers when data needs to be reloaded.
   * @returns {Observable<void>}
   */
  get refresh$() {
    return this._refresh$.asObservable();
  }

  /**
   * Emits a new value to the refresh stream to trigger UI updates.
   */
  notifyRefresh() {
    this._refresh$.next();
  }

  /**
   * Retrieves all registered species from the database.
   * @returns {Observable<Species[]>} Collection of galactic species.
   */
  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  /**
   * Gets the global tournament ranking based on victories.
   * @returns {Observable<any[]>} Sorted list of species and their win counts.
   */
  getRanking(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/ranking`);
  }

  /**
   * Registers a new species in the galactic repository.
   * Triggers a global refresh upon success.
   * @param {any} species - The species data to be saved.
   */
  registerSpecies(species: Partial<Species>): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }

  /**
   * Executes a combat between two species.
   * Triggers a global refresh to update rankings and victory counts.
   * @param {number} id1 - Unique identifier for the first contender.
   * @param {number} id2 - Unique identifier for the second contender.
   * @returns {Observable<any>} Outcome of the battle including the winner.
   */
  startCombat(id1: number | undefined, id2: number | undefined): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle?id1=${id1}&id2=${id2}`, {});
  }

  /**
   * Executes a random combat between two species.
   * Triggers a global refresh to update rankings and victory counts.
   * @returns {Observable<any>} Outcome of the battle including the winner.
   */
  startRandomCombat(): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle/randomBattle`, {});
  }

}
