import { Component, OnInit } from '@angular/core';
import { User } from './../user.model';
import { UserService } from '../user.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  user: User=null;
  updateUserFormGroup: FormGroup=null;
  msgs: Message[] = [];
  displayContVisi = false;
  modifContVisi = true;

  constructor(private uServ: UserService, private fb: FormBuilder) {
    this.uServ = uServ;
    this.fb = fb;
  }

  ngOnInit() {
    //this.user = new User("lastname", "fName", "ceci est un mail", "50 une addresse de merde", 555555555, "admin", "pwd");
    this.uServ.getConnectedUser().subscribe(user => {
      this.user = User.fromJSON(user);
      this.updateUserFormGroup = this.fb.group({
        fName: [this.user.firstName, Validators.required],
        lName: [this.user.lastName, Validators.required],
        mail: [this.user.mail, Validators.email],
        address: [this.user.address],
        phone: [this.user.phone,phoneValidator],
      });
    });
  }

  toModify() {
    this.displayContVisi = true;
    this.modifContVisi = false;
  }

  onSubmit() {
    this.msgs = [];

    if (!this.updateUserFormGroup.valid) {
      this.msgs.push({
        severity: 'error',
        summary: "Champs invalides",
        detail: "Certains champs sont incorrects."
      });
      return;
    }

    this.user.firstName = this.updateUserFormGroup.value.fName;
    this.user.lastName = this.updateUserFormGroup.value.lName;
    this.user.mail = this.updateUserFormGroup.value.mail;
    this.user.address = this.updateUserFormGroup.value.address;
    this.user.phone = this.updateUserFormGroup.value.phone;

    this.uServ.updateUser(this.user).subscribe(() => {
      this.uServ.setConnectedUser(this.user);
      this.msgs.push({ severity: 'success', summary: 'Vos informations ont bien été mises à jour', detail: '' });
      this.displayContVisi = false;
      this.modifContVisi = true;
    });
  }

}

/*
Validate phone
Check is a number and is > 0
*/
function phoneValidator(fg: FormGroup) {
  let phoneNum=parseInt(fg.get("phone").value);
  return !isNaN(phoneNum) && phoneNum>0;
}
