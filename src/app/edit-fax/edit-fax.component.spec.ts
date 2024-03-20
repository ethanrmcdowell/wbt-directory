import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaxComponent } from './edit-fax.component';

describe('EditFaxComponent', () => {
  let component: EditFaxComponent;
  let fixture: ComponentFixture<EditFaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
