import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavtatieComponent } from './favtatie.component';

describe('FavtatieComponent', () => {
  let component: FavtatieComponent;
  let fixture: ComponentFixture<FavtatieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavtatieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavtatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
