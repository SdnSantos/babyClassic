import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoVestidoComponent } from './novo-vestido.component';

describe('NovoVestidoComponent', () => {
  let component: NovoVestidoComponent;
  let fixture: ComponentFixture<NovoVestidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoVestidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoVestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
