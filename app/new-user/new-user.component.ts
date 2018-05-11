import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Message } from 'primeng/components/common/api';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  msgs: Message[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = new User("", "", "", "", null, "", "");
  }

  OnSubmit(form: NgForm) {
    this.msgs = [];
    console.log(this.user.phone);
    //check phone input is valid
    if (isNaN(parseInt(this.user.phone))) {
      this.msgs.push({
        severity: 'error',
        summary: "Champ invalide",
        detail: 'Vous devez saisir un numéro de téléphone'
      });
    } else {
      /* this.userService.registerUser(this.user)
           .subscribe((data: any) => {
             if (data.state == "success") {
               this.resetForm(form);
               this.msgs.push({
                 severity: 'success',
                 summary: "Votre compte a été créer",
                 detail: 'Vous pouvez maintenant vous connecté'
               });
             } else {
               this.msgs.push({
                 severity: 'error',
                 summary: "Erreur",
                 detail: 'Cette addresse mail est déjà relié à un compte.'
               });
             }
           }, error => console.log(error)); */
    }
  }
}
