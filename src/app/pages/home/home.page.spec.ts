import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ApiProvider } from 'src/app/providers/api.provider';
import { HomePage } from './home.page';
import { of } from 'rxjs';

describe('Test HomePage', () => {
  let homeComponent: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiProvider: any;

  // const dummyUser: any = {
  //   jwt: 'x',
  //   role: 'USER',
  // };

  // dummy user data
  const dummyData: any = [
    {
      username: 'a',
      id: 1,
      name: 'yyy',
      email: "aafe@efew.fe",
    },
    {
      username: 'b',
      id: 2,
      name: 'xxx',
      phone: "1-770-736-8031 x56442",
      email: "x@a.biz",
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        RouterTestingModule,
        IonicModule,
      ],
      providers: [{
        provide: ApiProvider,
        useValue: {
          // dummy data in ApiProvider getDataArray
          getDataArray: () => of(dummyData),
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    homeComponent = fixture.debugElement.componentInstance;
    apiProvider = TestBed.inject(ApiProvider);
    fixture.detectChanges();
  });

  it('should create home page', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-title').textContent).toContain('Users');
  });

  // it("should use the users list from the service", () => {
  //   const apiProvider = fixture.debugElement.injector.get(ApiProvider);
  //   fixture.detectChanges();

  //   expect(apiProvider.getUsers()).toEqual(homeComponent.usersData);
  // });

  // it("should fetch user data asynchronously", async () => {
  //   const apiProvider = fixture.debugElement.injector.get(ApiProvider);
  //   let spy = spyOn(apiProvider, "getUsers").and.returnValue(
  //     Promise.resolve(dummyData)
  //   );

  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(homeComponent.usersData).toEqual(dummyData);
  //   });
  // });
});