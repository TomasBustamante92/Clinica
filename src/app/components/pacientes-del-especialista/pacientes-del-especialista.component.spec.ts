import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDelEspecialistaComponent } from './pacientes-del-especialista.component';

describe('PacientesDelEspecialistaComponent', () => {
  let component: PacientesDelEspecialistaComponent;
  let fixture: ComponentFixture<PacientesDelEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacientesDelEspecialistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesDelEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
