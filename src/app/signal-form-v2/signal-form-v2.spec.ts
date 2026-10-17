import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalFormV2 } from './signal-form-v2';

describe('SignalFormV2', () => {
  let component: SignalFormV2;
  let fixture: ComponentFixture<SignalFormV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormV2],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalFormV2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
