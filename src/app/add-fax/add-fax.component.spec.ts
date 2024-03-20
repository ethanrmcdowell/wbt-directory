import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaxComponent } from './add-fax.component';

describe('AddFaxComponent', () => {
  let component: AddFaxComponent;
  let fixture: ComponentFixture<AddFaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
