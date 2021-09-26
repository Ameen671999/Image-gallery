import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  key = "UoewSKsaGIZoCkvhZAjHhY9bNG4ItMkTFimPfNLVA9c";
  page = 1;
  per_page = 21;

  getImage() {
    return this.httpClient.get(
      `https://api.unsplash.com/photos/?page=${this.page}&per_page=${this.per_page}&client_id=${this.key}`
    );
  }

}
