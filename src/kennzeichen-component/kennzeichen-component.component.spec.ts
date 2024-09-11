import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KennzeichenComponentComponent } from './kennzeichen-component.component';

describe('KennzeichenComponentComponent', () => {
  let component: KennzeichenComponentComponent;
  let fixture: ComponentFixture<KennzeichenComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KennzeichenComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KennzeichenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
