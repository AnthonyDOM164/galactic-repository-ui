import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeciesService } from './services/species.service';
import { Species } from './models/species.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <h1>Galactic Tournament</h1>
    <p>Revisando conexión con Render...</p>

    <ul *ngIf="speciesList.length > 0">
      <li *ngFor="let s of speciesList">
        {{ s.name }} - Poder: {{ s.powerLevel }}
      </li>
    </ul>
  `
})
export class App {
  private speciesService = inject(SpeciesService);
  speciesList: Species[] = [];

  ngOnInit(): void {
    this.speciesService.getSpecies().subscribe({
      next: (data) => {
        console.log('¡Conexión exitosa! Datos recibidos:', data);
        this.speciesList = data;
      },
      error: (err) => {
        console.error('Error conectando a Render:', err);
      }
    });
  }
}
