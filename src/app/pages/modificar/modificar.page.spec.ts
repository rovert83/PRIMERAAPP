import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPage } from './modificar.page';
import { ActivatedRoute } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

/*
describe('ModificarPage', () => {
  let component: ModificarPage;
  let fixture: ComponentFixture<ModificarPage>;

  beforeEach(async () => {
    const activatedRouteMock = {
      queryParams: {
        subscribe: (fn: (value: any) => void) => {
          fn({
            idEnviado: '123',
            textoEnviado: 'Texto de ejemplo',
            tituloEnviado: 'Título de ejemplo'
          });
        },
      }
    };

    TestBed.configureTestingModule({
      declarations: [ModificarPage],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        BdserviceService,
        SQLite // Asegúrate de proporcionar el servicio SQLite aquí
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/


describe('ModificarPage', () => {
  let component: ModificarPage;
  let fixture: ComponentFixture<ModificarPage>;

  // Mock de SQLite para usar en las pruebas
  const mockSQLiteFactory = {
    create: (): Promise<any> => Promise.resolve({} as SQLiteObject) // Cambia SQLiteObject según la importación real
  };

  beforeEach(async () => {
    const activatedRouteMock = {
      queryParams: {
        subscribe: (fn: (value: any) => void) => {
          fn({
            idEnviado: '123',
            textoEnviado: 'Texto de ejemplo',
            tituloEnviado: 'Título de ejemplo'
          });
        },
      }
    };

    TestBed.configureTestingModule({
      declarations: [ModificarPage],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        BdserviceService,
        SQLite,
        {
          provide: SQLite,
          useFactory: () => mockSQLiteFactory.create() // Usa useFactory para proporcionar SQLite
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
