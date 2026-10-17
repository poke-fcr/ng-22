import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, email, form, FormField, max, min, minLength, required } from '@angular/forms/signals';

interface IJobApplication {
  fullName: string
  email: string
  phoneNumber: number | null
  age: number | null
  experience: number | null
  jobRole: string
  skills: any
  expectedSalary: number | null
  currentlyEmployed: any
  noticePeriod: any
}

enum INoticePeriod {
  '30 Days', '60 Days', '90 Days'
}

enum IJobRole {
  'Angular Developer', 'Java Developer', 'QA Engineer'
}


@Component({
  imports: [FormField, JsonPipe],
  selector: 'app-signal-form-v2',
  styleUrl: './signal-form-v2.scss',
  templateUrl: './signal-form-v2.html',
})
export class SignalFormV2 {

  jobApplicationModel = signal<IJobApplication>({
    fullName: '',
    email: '',
    phoneNumber: null,
    age: null,
    experience: null,
    jobRole: '',
    skills: '',
    expectedSalary: null,
    currentlyEmployed: false,
    noticePeriod: null
  })

  jobRoleOptions: any[] = ['Angular Developer', 'Java Developer', 'QA Engineer'];

  jobApplicationForm = form(this.jobApplicationModel, path => {
    required(path.fullName, {
      message: 'This is required'
    })
    minLength(path?.fullName, 3, {
      message: 'Minimum length is three characters.'
    })

    required(path.email, {
      message: 'required'
    })
    email(path.email, {
      message: 'invalid'
    })

    required(path.phoneNumber, {
      message: 'required'
    })
    min(path.phoneNumber, 999999999, {
      message: 'Required 10 digits'
    })
    max(path.phoneNumber, 10000000000, {
      message: 'Required 10 digits.'
    })

    required(path.age, {
      message: 'required'
    })
    min(path.age, 18, {
      message: ">18"
    })
    max(path.age, 60, {
      message: "<60"
    })

    required(path.experience, {
      message: 'required'
    })
    min(path.experience, 0, {
      message: '>0'
    })
    max(path.experience, 40, {
      message: "<40"
    })

    required(path.jobRole, {
      message: 'required'
    })

    required(path.skills, {
      message: 'required'
    })

    required(path.expectedSalary, {
      message: 'required'
    })
    min(path.expectedSalary, 0, {
      message: '>0'
    })

    // disabled(path.noticePeriod, {
    //   when: () => path.currentlyEmployed
    // })

  })

  submitForm() {
    if(this.jobApplicationForm().invalid()) {
      alert('Resolve erros before submitting the form')
      return
    }
  console.log(this.jobApplicationForm().value())
  }



}
