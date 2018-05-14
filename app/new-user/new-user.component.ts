import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Message } from 'primeng/components/common/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  msgs: Message[] = [];
  checkCGU: string;
  CGUPanelVisi: boolean = false;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = new User(0,"", "", "", "", null, "", "");
  }

  OnSubmit(form: NgForm) {
    this.msgs = [];
    if (!this.checkCGU) {
      this.msgs.push({
        severity: 'error',
        summary: "CGU / CGV",
        detail: "Veuillez accepter les CGU et CGV afin de créer votre compte."
      });
      return;
    }
    if (!form.valid) {
      this.msgs.push({
        severity: 'error',
        summary: "Champs vides",
        detail: "Tous les champs de ce formulaire sont obligatoires."
      });
      return;
    }
    //check phone input is valid
    if (isNaN(parseInt(this.user.phone))) {
      this.msgs.push({
        severity: 'error',
        summary: "Champ invalide",
        detail: 'Vous devez saisir un numéro de téléphone'
      });
    } else {
      this.userService.registerUser(this.user)
        .subscribe((data: any) => {
          if (data.state == "success") {
            this.resetForm(form);
            this.msgs.push({
              severity: 'success',
              summary: "Votre compte a été créer",
              detail: 'Vous pouvez maintenant vous connecté'
            });
            this.router.navigate(['/authentification']);
          } else {
            this.msgs.push({
              severity: 'error',
              summary: "Erreur",
              detail: 'Cette addresse mail est déjà relié à un compte.'
            });
          }
        }, error => console.log(error));
    }
  }
  showCGU() {
    this.CGUPanelVisi = true;
  }
}
