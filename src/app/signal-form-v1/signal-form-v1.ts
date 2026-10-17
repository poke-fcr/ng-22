import { Component, signal } from '@angular/core';
import { email, form, FormField, min, minLength, required } from '@angular/forms/signals';

interface IEmployee {
  name: string
  company: string
  age: number
  email: string
}


@Component({
  imports: [FormField],
  selector: 'app-signal-form-v1',
  styleUrl: './signal-form-v1.scss',
  templateUrl: './signal-form-v1.html',
})
export class SignalFormV1 {

  employeeModel = signal<IEmployee>({
    name: '',
    company: '',
    age: 0,
    email: ''
  })


  employeeForm = form(this.employeeModel, path => {
    required(path.name, {
      message: 'Name is required'
    });
    minLength(path.name,3, {
      message: "Minimum length of 3 is required"
    });

    email(path.email, {
      message: 'Enter a valid email'
    })
    // required(path.email)

    min(path.age, 18, {
      message: 'Minimum age should be 18'
    })

  })

  submitForm() {
    if(this.employeeForm().invalid()) {
      alert('Invalid form')
      return; 
    }

    console.log('Form SUbmitted', this.employeeModel())
  }

}
