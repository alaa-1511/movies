import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatelsComponent } from './datels.component';

describe('DatelsComponent', () => {
  let component: DatelsComponent;
  let fixture: ComponentFixture<DatelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
