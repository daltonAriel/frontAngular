import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoresComponent } from './nuevo-productores.component';

describe('NuevoProductoresComponent', () => {
  let component: NuevoProductoresComponent;
  let fixture: ComponentFixture<NuevoProductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoProductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
