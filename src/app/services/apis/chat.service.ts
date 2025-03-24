import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCurrentUser } from '../../utils/utils-user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  public generatePrompt(message: string): Observable<any> {
    let user = getCurrentUser();
    console.log(user[0].id);
    let bodyObj = {
      model: "deepseek-r1:14b",
      prompt: message,
      userId: user[0].id,
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 100000
      }
    }
    return this.httpClient.post<any>('http://localhost:3000/chat/generate',bodyObj);
  }

}
