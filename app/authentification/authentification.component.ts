import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  user: User=new User("","","","",0,"","");

  constructor(private userService: UserService) {
    this.userService=this.userService;
   }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = new User("","","","",0,"","");
  }

  ngOnInit() {
  }
  OnSubmit(form: NgForm) {
    this.userService.userAuthentification(form.value)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
        }
      },
        error => console.log(error))

  }


}
