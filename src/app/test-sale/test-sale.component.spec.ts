import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSaleComponent } from './test-sale.component';

describe('TestSaleComponent', () => {
  let component: TestSaleComponent;
  let fixture: ComponentFixture<TestSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
