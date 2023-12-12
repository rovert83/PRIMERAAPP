import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ActivatedRoute } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';






describe('LoginPage', () => {
 // Mock para ActivatedRoute
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ],
      imports: [
        IonicStorageModule.forRoot() // Agregar IonicStorageModule.forRoot() aquí
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
