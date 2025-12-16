import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let fixture: any;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when openDialog is called', () => {
    expect(component.isDialogOpen()).toBe(false);
    component.openDialog();
    expect(component.isDialogOpen()).toBe(true);
  });

  it('should toggle inline mode based on event', () => {
    const mockEventTrue = { target: { checked: true } } as unknown as Event;
    const mockEventFalse = { target: { checked: false } } as unknown as Event;

    component.toggleInlineMode(mockEventTrue);
    expect(component.isInline()).toBe(true);

    component.toggleInlineMode(mockEventFalse);
    expect(component.isInline()).toBe(false);
  });
});
