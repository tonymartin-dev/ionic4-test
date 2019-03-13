import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute}  from '@angular/router';
import { Validator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthService }            from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  login_form: any;
  submit: Function;
  logError: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.login_form = this.formBuilder.group({
      user:  new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.submit = value => {
      console.log('Loggin in: ', value);
      var login = this.authService.login(value);
      if(login){ 
        this.logError = false;
        this.router.navigate(['/home']);
      }else{
        this.logError = true;
      } 
    }
  }

}
