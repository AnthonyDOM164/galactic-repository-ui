import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, tap} from 'rxjs';
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

  private _species$ = new BehaviorSubject<Species[]>([]);
  private _ranking$ = new BehaviorSubject<Species[]>([]);

  public species$ = this._species$.asObservable();
  public ranking$ = this._ranking$.asObservable();

  constructor(private http: HttpClient) {
    this.refreshAll();
  }

  refreshAll(): void {
    this.getSpecies().subscribe(data => this._species$.next(data));
    this.getRanking().subscribe(data => this._ranking$.next(data));
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
    return this.http.post<Species>(this.apiUrl, species).pipe(
      tap(() => this.refreshAll())
    );
  }

  /**
   * Executes a combat between two species.
   * Triggers a global refresh to update rankings and victory counts.
   * @param {number} id1 - Unique identifier for the first contender.
   * @param {number} id2 - Unique identifier for the second contender.
   * @returns {Observable<any>} Outcome of the battle including the winner.
   */
  startCombat(id1: number | undefined, id2: number | undefined): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle?id1=${id1}&id2=${id2}`, {}).pipe(
      tap(() => this.refreshAll())
    );
  }

  /**
   * Executes a random combat between two species.
   * Triggers a global refresh to update rankings and victory counts.
   * @returns {Observable<any>} Outcome of the battle including the winner.
   */
  startRandomCombat(): Observable<Species> {
    return this.http.post<Species>(`${this.apiUrl}/battle/randomBattle`, {}).pipe(
      tap(() => this.refreshAll())
    );
  }

}
