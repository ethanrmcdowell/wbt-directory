import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockBreakpointObserver: jasmine.SpyObj<BreakpointObserver>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockBreakpointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    mockDataService = jasmine.createSpyObj('DataService', ['getDirectoryData', 'getFaxData', 'addEmployee']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['checkUserStatus']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: BreakpointObserver, useValue: mockBreakpointObserver },
        { provide: DataService, useValue: mockDataService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties correctly', () => {
    expect(component.title).toEqual('wbt-directory');
    expect(component.isMobile).toBeTrue();
    expect(component.userAuthenticated).toBeFalse();
    expect(component.people).toEqual([]);
    expect(component.fax).toEqual([]);
    expect(component.searchText).toEqual('');
    expect(component.directorySelected).toEqual('all');
    expect(component.departments).toEqual(["assessing", "inspection", "building", "budget", "clerk", "code", "facilities", "finance", "hr", "it", "pds", "engineering", "environmental", "planning", "purchasing", "supervisor", "treasurer", "water", "water_billing", "fire", "payroll", "police", "records"]);
    expect(component.showAdmin).toBeFalse();
    expect(component.byDepartments).toEqual({
      assessing: [],
      inspection: [],
      budget: [],
      building: [],
      clerk: [],
      code: [],
      facilities: [],
      finance: [],
      hr: [],
      it: [],
      pds: [],
      engineering: [],
      environmental: [],
      payroll: [],
      planning: [],
      purchasing: [],
      supervisor: [],
      treasurer: [],
      water: [],
      water_billing: [],
      fire: [],
      police: [],
      records: []
    });
  });
});