import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseURL}/issue`);
  }

  add(body: any) {
    return this.http.post(`${this.baseURL}/issue`, body);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseURL}/issue/${id}`);
  }

  update(id: string, body: any) {
    return this.http.put(`${this.baseURL}/issue/${id}`, body)
  }
}
