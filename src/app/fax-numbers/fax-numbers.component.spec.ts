import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaxNumbersComponent } from './fax-numbers.component';

describe('FaxNumbersComponent', () => {
  let component: FaxNumbersComponent;
  let fixture: ComponentFixture<FaxNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaxNumbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaxNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
