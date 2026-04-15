import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../../models/perfil.model';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  private apiUrl = 'http://localhost:3000/api/perfil';

  constructor(private http: HttpClient) {}

  getPerfil(): Observable<Perfil> {
    return this.http.get<Perfil>(this.apiUrl);
  }

  updatePerfil(data: Partial<Perfil>): Observable<Perfil> {
    return this.http.put<Perfil>(this.apiUrl, data);
  }
}
