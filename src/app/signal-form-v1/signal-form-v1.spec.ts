import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalFormV1 } from './signal-form-v1';

describe('SignalFormV1', () => {
  let component: SignalFormV1;
  let fixture: ComponentFixture<SignalFormV1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormV1],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalFormV1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
