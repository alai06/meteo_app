import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from './weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: WeatherData | null = null;
  city: string = 'Nice';
  loading: boolean = false;
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.searchWeather();
  }

  searchWeather(): void {
    if (!this.city.trim()) {
      this.error = 'Veuillez entrer un nom de ville';
      return;
    }

    this.loading = true;
    this.error = '';

    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ville introuvable ou erreur de connexion';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      this.loading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          this.weatherService.getWeatherByCoords(lat, lon).subscribe({
            next: (data) => {
              this.weatherData = data;
              this.city = data.name;
              this.loading = false;
            },
            error: (err) => {
              this.error = 'Erreur lors de la récupération de votre position';
              this.loading = false;
              console.error(err);
            }
          });
        },
        (error) => {
          this.error = 'Impossible d\'obtenir votre position';
          this.loading = false;
        }
      );
    }
  }
}