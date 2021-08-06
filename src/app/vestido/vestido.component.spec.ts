import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestidoComponent } from './vestido.component';

describe('VestidoComponent', () => {
  let component: VestidoComponent;
  let fixture: ComponentFixture<VestidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VestidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VestidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
