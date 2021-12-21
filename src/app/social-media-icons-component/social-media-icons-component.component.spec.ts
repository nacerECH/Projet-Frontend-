import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialMediaIconsComponentComponent } from './social-media-icons-component.component';

describe('SocialMediaIconsComponentComponent', () => {
  let component: SocialMediaIconsComponentComponent;
  let fixture: ComponentFixture<SocialMediaIconsComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaIconsComponentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialMediaIconsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
