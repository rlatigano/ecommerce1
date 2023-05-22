import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { debounceTime, finalize, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errors: string[] | null = null;

  constructor (private fb: FormBuilder, private accountService: AccountService, private router: Router){}

  complexPassword ="^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$"  
  /* 
  https://regexlib.com/Search.aspx?k=password
  This regular expression match can be used for validating strong password.
  Password must contain at least one letter, at least one number, and be longer than six charaters.
  (?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$
   It expects atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 6-10 characters. 
   The sequence of the characters is not important. This expression follows the above 4 norms specified by microsoft for a strong password.

  */
  registerForm = this.fb.group({

    displayName: ['', Validators.required],
    email: ['',[Validators.required, Validators.email],[this.validateEmailNotTaken()]],
    password: ['',[Validators.required, Validators.pattern(this.complexPassword)]],
  })
  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop'),
      error: error => this.errors = error.errors
    })
  }

  validateEmailNotTaken(): AsyncValidatorFn{
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
          debounceTime(1000),
          take(1),
          switchMap(() => { return this.accountService.checkEmailExists(control.value).pipe(
            map(result => result ? {emailExists: true} : null),
            finalize(() => control.markAsTouched())
          )

          })

      )

      
    }
  }
}
