import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductoresComponent } from './listar-productores.component';

describe('ListarProductoresComponent', () => {
  let component: ListarProductoresComponent;
  let fixture: ComponentFixture<ListarProductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
