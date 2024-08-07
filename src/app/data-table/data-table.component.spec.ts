import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../user.interface';
import { UserService } from '../user.service';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: { lat: '-43.9509', lng: '-34.4618' }
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains'
      }
    }
  ];

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers']);
    mockUserService.getUsers.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      imports: [DataTableComponent, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.data).toEqual(mockUsers);
    expect(mockUserService.getUsers).toHaveBeenCalled();
  }));

  
  it('should get correct value for sorting', () => {
    const user = mockUsers[0];

    expect(component.getValue(user, 'name')).toBe('leanne graham');
    expect(component.getValue(user, 'address')).toBe('gwenborough');
    expect(component.getValue(user, 'company')).toBe('romaguera-crona');
  });

  it('should identify active column correctly', () => {
    component.sortColumn = 'name';
    expect(component.isColumnActive('name')).toBeTrue();
    expect(component.isColumnActive('email')).toBeFalse();
  });
});