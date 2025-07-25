import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import SecureLS from 'secure-ls';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  ls = new SecureLS();

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    initFlowbite();
  }

  login() {
    let nErr = 0;

    if (this.username == '') {
      this.toastr.warning('username mancante...', 'Attenzione!');
      nErr++;
    }

    if (this.password == '') {
      this.toastr.warning('password mancante...', 'Attenzione!');
      nErr++;
    }

    if (nErr == 0) {
      this.ls.remove('user');
      this.loginService.login(this.username, this.password).subscribe({
        next: (authResponse) => {
          if (authResponse.token != '' && authResponse.token != null) {
            this.ls.set('user', authResponse.token);
            this.toastr.success(
              'accesso eseguito correttamente...',
              'Successo!'
            );
            this.router.navigate(['/dashboard']);
          }
        },
        error: (authError) => {
          this.toastr.error('username o password errati...', 'Attenzione!');
        },
      });
    }
  }
}
