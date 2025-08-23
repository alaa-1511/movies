import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WesternComponent } from './western.component';

describe('WesternComponent', () => {
  let component: WesternComponent;
  let fixture: ComponentFixture<WesternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WesternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WesternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
