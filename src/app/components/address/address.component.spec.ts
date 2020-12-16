import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressComponent } from './address.component';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AddressModule } from './address.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  const appRoutes: Routes = [
    { path: 'address', component: AddressComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AddressModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule
      ],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component is created', () => {
    expect(component).toBeTruthy();
  });

  it('should have paginator', () => {
    const page = fixture.debugElement.nativeElement;

    const numberOfRows = fixture.debugElement.query(By.css('.mat-paginator-range-label')).nativeElement.textContent.trim();
    expect(numberOfRows).toContain('of');
  });

  it('should have filter input', () => {
    const input = fixture.debugElement.queryAll(By.css('#mat-input-2'));
    expect(input).toBeTruthy();
  });

  it('should have table', () => {

    //finding one of the headers should be enough (i. e: street number)
    const column = fixture.debugElement.queryAll(By.css('.mat-column-streetNumber'));
    expect(column).toBeTruthy();
  });
});
