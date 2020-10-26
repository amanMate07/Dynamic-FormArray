import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm } from "@angular/forms";
import { UserService } from "./user.service";

interface Users {
  id: string;
  changes: {};
}

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm: FormGroup;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.userForm = new FormGroup({
        usersFormArray: new FormArray(
          users && users.length
            ? users.map((user) => this.createUserForm(user))
            : []
        ),
      });
    });
  }

  createUserForm(data): FormGroup {
    return new FormGroup({
      email: new FormControl(data.email),
      id: new FormControl(data.id),
      password: new FormControl(data.password),
      name: new FormControl(data.name),
      check: new FormControl(false),
    });
  }
}
