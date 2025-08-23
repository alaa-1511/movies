import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrindyComponent } from './trindy.component';

describe('TrindyComponent', () => {
  let component: TrindyComponent;
  let fixture: ComponentFixture<TrindyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrindyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrindyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
