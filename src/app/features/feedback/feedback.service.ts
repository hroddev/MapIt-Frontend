import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Feedback } from '../../models/feedback.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SendModalComponent } from './components/send-modal/send-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }
  
  // TODO: Add feedback to the database
  sendFeedback(
    feedback: Feedback  
    ) {

      this.showConfirmationMessage();
      console.log("Mensaje Enviado", feedback);
  
      // return this.http.post(`${this.apiUrl}/feedback`, feedback);
  }


  private showConfirmationMessage() {
    this._snackBar.openFromComponent(SendModalComponent, {
      duration: 2500,
    });
  }


}
