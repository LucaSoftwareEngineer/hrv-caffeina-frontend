import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ResponseModelloNeurale} from "../login/ResponseModelloNeurale";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  hr = '';
  rr = '';
  sdnn = '';
  rmssd = '';
  lf = '';
  hf = '';
  lf_su_hf = '';

  verificaPresenzaCaffeina() {
    let endpointModelloNeurale = `http://localhost:5000/?hr=${this.hr}&rr=${this.rr}&sdnn=${this.sdnn}&rmssd=${this.rmssd}&lf=${this.lf}&hf=${this.hf}&lf_su_hf=${this.lf_su_hf}`;

    this.http.get<ResponseModelloNeurale>(endpointModelloNeurale).subscribe(json => {
      if (json.caffeina) {
        this.toastr.success('I seguenti dati indicano che hai assunto caffeina negli ultimi 60 minuti', 'Caffeina rilevata');
      } else {
        this.toastr.error('I seguenti dati indicano che non hai assunto caffeina negli ultimi 60 minuti', 'Caffeina non rilevata');
      }
    })
  }

}
