import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '55e5e258c213636ec142282fbf07805b';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get<WeatherData>(url);
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherData> {
    const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get<WeatherData>(url);
  }
}