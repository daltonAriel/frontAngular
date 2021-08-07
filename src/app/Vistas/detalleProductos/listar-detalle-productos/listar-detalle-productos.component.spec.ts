import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetalleProductosComponent } from './listar-detalle-productos.component';

describe('ListarDetalleProductosComponent', () => {
  let component: ListarDetalleProductosComponent;
  let fixture: ComponentFixture<ListarDetalleProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDetalleProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDetalleProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
