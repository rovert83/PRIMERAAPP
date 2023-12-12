import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let fakeActivatedRoute: any;

  beforeEach(async () => {
    fakeActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParams']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        // Otros servicios necesarios
      ],
      // Otros imports necesarios

      imports: [
        IonicStorageModule.forRoot() // Importa IonicStorageModule y configúralo
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    // Simular el comportamiento de queryParams cuando se inicializa la página
    fakeActivatedRoute.queryParams = of({
      rutUsuario: 'valor de prueba'
      // Otros parámetros simulados
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Otras pruebas...
});
