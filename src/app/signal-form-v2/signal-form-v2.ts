
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  disabled,
  email,
  form,
  FormField,
  max,
  min,
  minLength,
  pattern,
  required
} from '@angular/forms/signals';

type JobRole =
  | 'Angular Developer'
  | 'Java Developer'
  | 'QA Engineer'
  | '';

type NoticePeriod =
  | 'Immediate'
  | '30 Days'
  | '60 Days'
  | '90 Days'
  | '';

interface IJobApplication {
  fullName: string;
  email: string;
  phoneNumber: string;
  age: number | null;
  experience: number | null;
  jobRole: JobRole;
  skills: string[];
  expectedSalary: number | null;
  currentlyEmployed: boolean;
  noticePeriod: NoticePeriod;
}

const INITIAL_MODEL: IJobApplication = {
  fullName: '',
  email: '',
  phoneNumber: '',
  age: null,
  experience: null,
  jobRole: '',
  skills: [],
  expectedSalary: null,
  currentlyEmployed: false,
  noticePeriod: ''
};

@Component({
  selector: 'app-signal-form-v2',
  standalone: true,
  imports: [FormField, JsonPipe],
  templateUrl: './signal-form-v2.html',
  styleUrl: './signal-form-v2.scss'
})
export class SignalFormV2 {
  jobApplicationModel = signal<IJobApplication>({
    ...INITIAL_MODEL
  });

  submitted = signal(false);

  jobRoleOptions: JobRole[] = [
    'Angular Developer',
    'Java Developer',
    'QA Engineer'
  ];

  skillOptions = [
    'Problem Solving',
    'Teamwork',
    'Communication',
    'Leadership'
  ];

  noticePeriodOptions: NoticePeriod[] = [
    'Immediate',
    '30 Days',
    '60 Days',
    '90 Days'
  ];

  jobApplicationForm = form(
    this.jobApplicationModel,
    path => {
      // Full name
      required(path.fullName, {
        message: 'Full name is required'
      });

      minLength(path.fullName, 3, {
        message: 'Name must contain at least 3 characters'
      });

      // Email
      required(path.email, {
        message: 'Email is required'
      });

      email(path.email, {
        message: 'Enter a valid email address'
      });

      // Indian mobile number: exactly 10 digits
      required(path.phoneNumber, {
        message: 'Phone number is required'
      });

      pattern(path.phoneNumber, /^[0-9]{10}$/, {
        message: 'Enter exactly 10 digits'
      });

      // Age: 18 to 60 inclusive
      required(path.age, {
        message: 'Age is required'
      });

      min(path.age, 18, {
        message: 'Age must be at least 18'
      });

      max(path.age, 60, {
        message: 'Age must not exceed 60'
      });

      // Experience: 0 to 40 years
      required(path.experience, {
        message: 'Experience is required'
      });

      min(path.experience, 0, {
        message: 'Experience cannot be negative'
      });

      max(path.experience, 40, {
        message: 'Experience cannot exceed 40 years'
      });

      // Job role
      required(path.jobRole, {
        message: 'Please select a job role'
      });

      // At least two skills
      minLength(path.skills, 2, {
        message: 'Select at least two skills'
      });

      // Expected salary: positive whole number
      required(path.expectedSalary, {
        message: 'Expected salary is required'
      });

      min(path.expectedSalary, 1, {
        message: 'Expected salary must be greater than zero'
      });

      // Conditional notice period
      required(path.noticePeriod, {
        message: 'Please select your notice period',
        when: ({ valueOf }) =>
          valueOf(path.currentlyEmployed)
      });

      disabled(path.noticePeriod, {
        when: ({ valueOf }) =>
          !valueOf(path.currentlyEmployed)
      });
    }
  );

  onSkillChange(skill: string, checked: boolean): void {
    this.submitted.set(false);

    this.jobApplicationModel.update(model => {
      const skills = checked
        ? [...new Set([...model.skills, skill])]
        : model.skills.filter(item => item !== skill);

      return {
        ...model,
        skills
      };
    });
  }

  isSkillSelected(skill: string): boolean {
    return this.jobApplicationModel().skills.includes(skill);
  }

  submitForm(): void {
    this.submitted.set(false);

    if (this.jobApplicationForm().invalid()) {
      return;
    }

    this.submitted.set(true);

    console.log(
      'Submitted application:',
      this.jobApplicationModel()
    );
  }

  resetForm(): void {
    this.jobApplicationModel.set({
      ...INITIAL_MODEL,
      skills: []
    });

    this.submitted.set(false);
  }
}
