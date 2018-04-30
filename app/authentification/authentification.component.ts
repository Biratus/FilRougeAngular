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
  user: User;

  constructor(private userService: UserService) { }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',

    
      lastName: '',
      firstName:'',
      mail: '',
      address: '',
      phone: null
    
    }
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
