import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWatchlistComponent } from './stock-watchlist.component';

describe('StockWatchlistComponent', () => {
  let component: StockWatchlistComponent;
  let fixture: ComponentFixture<StockWatchlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockWatchlistComponent]
    });
    fixture = TestBed.createComponent(StockWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
