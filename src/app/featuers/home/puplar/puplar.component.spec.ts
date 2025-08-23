import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuplarComponent } from './puplar.component';

describe('PuplarComponent', () => {
  let component: PuplarComponent;
  let fixture: ComponentFixture<PuplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuplarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
