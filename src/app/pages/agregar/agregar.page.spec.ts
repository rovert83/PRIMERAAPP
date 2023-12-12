import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPage } from './agregar.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarPage', () => {
  let component: AgregarPage;
  let fixture: ComponentFixture<AgregarPage>;


  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite]
    });

    fixture = TestBed.createComponent(AgregarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
