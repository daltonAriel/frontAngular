import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDetalleProductosComponent } from './nuevo-detalle-productos.component';

describe('NuevoDetalleProductosComponent', () => {
  let component: NuevoDetalleProductosComponent;
  let fixture: ComponentFixture<NuevoDetalleProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDetalleProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDetalleProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
