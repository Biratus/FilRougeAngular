import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = new User("", "", "", "", 0, "", "");
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
        if (data.state == "success") {
          this.resetForm(form);
          //TODO message success + redirection page profile + set connected user in user.service
        } else {
          //TODO Message d'erreur user already exists
        }
      }, error => console.log(error));
  }
}
