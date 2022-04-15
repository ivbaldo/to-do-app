import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'toDo Application for SD';

  email: string = 'test';
  password: string = 'test';

  displayName = '';

  constructor(public userService: UserService){}

  ngOnInit()  {
    this.login();
    this.userService.getUser().subscribe(
      user => {this.displayName = user.name
        console.log(user.name);
      });
  }

  login() {
    const user = {email: this.email, pass: this.password};
    this.userService.singIn(user).subscribe(
      (loggedUser) => {
        this.userService.setToken(loggedUser.token);
        console.log("Login correcto");
        console.log(loggedUser.token);
      },
      (err) => {
        console.error("Error en el login");
        console.log(err);
      });
  }
}
