import {
  Component, OnInit,
  transition, ElementRef, Input, ViewChild, ChangeDetectionStrategy, ViewChildren, QueryList
} from '@angular/core';
import {PortfolioItemComponent} from "./portfolio-item/portfolio-item.component";
import {setTimeout} from "timers";
import {Router, ActivatedRoute, Params, Data} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {element} from "protractor";
import {PortfolioService} from "./portfolio.service";

var ID = 0;

const CONTENTDATA: Object = {
  title: 'Designing',
  subtitle: 'Experiences',
  name: 'Fredrik Johansson',
  quote: '" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo "',
  portfolioData: [{
    title: 'United Colors',
    logoSrc: '../../assets/images/logo-empty-grey.min.svg',
    logoAlt: '',
    carouselItemsData:[
      { imageSrc: '../../assets/images/united-colors-play-store.min.png', imageAlt: '1A', text: 'Top-down colorful android arcade game. Unite dots of same color, avoid the rest.'},
      { imageSrc: '../../assets/images/united-colors-in-game.min.png', imageAlt: '2A',
        text: `With the use of a phones gyroscope, the player moves a big dot,
        trying to collide and consume smaller dots of same color for point\'s,
        and at the same time avoid colliding with dots of other colors, which would result in game over.
        This project was built by Fredrik over a period of two months, it involved Android Java programming, 
        Google Play leaderboards, as well as Open GL ES graphic programming for rendering the game.` }
    ]
  },
    {
      title: 'Varramie',
      logoSrc: '../../assets/images/logo-empty-grey.min.svg',
      logoAlt: '',
      carouselItemsData:[
        { imageSrc: '../../assets/images/varramie.min.png', imageAlt: '1B', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
        { imageSrc: '../../assets/images/varramie.min.png', imageAlt: '2B', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
      ]
    },
    {
      title: 'UpLoad',
      logoSrc: '../../assets/images/logo-empty-grey.min.svg',
      logoAlt: '',
      carouselItemsData:[
        { imageSrc: '../../assets/images/placeholder-mockup-macbook-pro-silver.min.png', imageAlt: '1C', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
        { imageSrc: '../../assets/images/placeholder-mockup-macbook-pro-silver.min.png', imageAlt: '2C', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
      ]
    },
    {
      title: 'Room Booking',
      logoSrc: '../../assets/images/logo-empty-grey.min.svg',
      logoAlt: '',
      carouselItemsData:[
        { imageSrc: '../../assets/images/dohio-ipad-white.min.png', imageAlt: '1D', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
        { imageSrc: '../../assets/images/dohio-ipad-white.min.png', imageAlt: '2D', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
      ]
    },
    {
      title: 'HoloCare',
      logoSrc: '../../assets/images/logo-empty-grey.min.svg',
      logoAlt: '',
      carouselItemsData:[
        { imageSrc: '../../assets/images/hololens.min.png', imageAlt: '1E', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
        { imageSrc: '../../assets/images/hololens.min.png', imageAlt: '2E', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
      ]
    },
  ]};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioComponent implements OnInit {

  @ViewChildren('portfolioChild') portfolioItems: QueryList<PortfolioItemComponent>;
  private tempElement = document.createElement('div');
  private tempTop;
  private tempHeight;

  private raf = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame;

  private scrollPosition = 0;
  //private activeComponent = null;
  private id = ID++;
  private contentData = CONTENTDATA;

  private transitionEnd:(TransitionEvent, boolean)=>void = (event:TransitionEvent, force:boolean)=> {};

  constructor(private route: ActivatedRoute, private router: Router, private portfolioService:PortfolioService) { }

  ngOnInit() {}

  ngAfterViewInit() {

    // Init scroll position
    this.scrollPosition = window.pageYOffset;

    let title = this.route.snapshot.data['title'];

    // If there is a title, we open a new portfolio item
    if(title) {

      let component = this.portfolioItems.find((item: PortfolioItemComponent) => {return item.title === title;} );

      if(!component) return;

      // If the component is not ready,
      if(!component.isReady()) {

        // Wait for ready
        component.readySubject.subscribe((nothing)=> {

          // Unsubscribe and continue
          component.readySubject.unsubscribe();
          this.toggelCard(component);

        });
      } else {

        this.toggelCard(component);
      }
    } else {

      // We are at the home screen
      if(this.portfolioService.hasActiveComponent()) {

        // close card first
        let tempComponent = this.portfolioService.getActiveComponent();

        this.closeCard(tempComponent, ()=>{

          //After card has closed, open it again, to be able to play close animation
//          this.openCard(tempComponent);

        }, true);
      }
    }
  }

  private cardClick(component:PortfolioItemComponent){

    let url = component.title.toLowerCase().replace(' ', '-');
    this.router.navigate(['/' + url]);
  }

  private closeClick(component:PortfolioItemComponent){
    this.router.navigate(['/home']);
  }

  private toggelCard(component:PortfolioItemComponent) {

    // If there already is a card open, close it and wait for it to close
    if(this.portfolioService.hasActiveComponent()) {

      this.closeCard(this.portfolioService.getActiveComponent(), () => {

        // Scroll to right position
        window.scrollTo(window.pageXOffset, component.getTop());

        // open sought card
        this.openCard(component);


      });

      // Else open new card
    } else {

      // Scroll to right position
      // TODO: Add scroll for when typing url or using arrows to navigate browser
      //window.scrollTo(window.pageXOffset, component.getTop());

      this.openCard(component);
    }
  }

  private openCard(component:PortfolioItemComponent){

    // If the we are not in mobile view or the component is not ready, or the component is already open, end function.
    if(!PortfolioComponent.isMobileView() || !component.isReady() || component.isOpen()) return;

    // Add component to active component
    this.portfolioService.setActiveComponent(component);

    // Get card height and to, and save it for later use
    this.tempTop = component.getTop() - window.pageYOffset;
    this.tempHeight = component.getHeight();

    // Set height of temp element to card height
    this.tempElement.style.height = this.tempHeight + 'px';

    // Get nativeElement of the component
    let element = component.getElementRef().nativeElement;

    // Set styles
    element.style.cssText = 'position: fixed; top: '+this.tempTop+'px; height: '+this.tempHeight+'px; z-index: 100';

    // Add temp element before card
    element.parentNode.insertBefore(this.tempElement, element);

    // Save current scroll position
    this.scrollPosition = window.pageYOffset;

    // Make the content not scrollable
    window.document.body.style.overflow = 'hidden';

    // Wait for styles to take effect before transform
    this.raf(()=>{

      // Add shadow
      component.setHasShadow(true);

      // Add transition property
      element.classList.toggle('transition');

      // Set styles to transition to
      element.style.top = '0';
      element.style.height = '100vh';

      // Toggle arrows
      component.toggleArrows(); // TODO: Replace in component with isOpen

    });
  }

  private closeCard(component:PortfolioItemComponent, callback:()=>void, force:boolean = false){

    // If the component is not open, end function
    if(!force && !component.isOpen()) return;

    // Remove component from active component
    this.portfolioService.removeActiveComponent();

    // Scroll to original position
    if(window.pageYOffset != this.scrollPosition) window.scrollTo(window.pageXOffset, this.scrollPosition);

    // Toggle arrows
    component.toggleArrows(); // TODO: Replace in component with isOpen

    let element = component.getElementRef().nativeElement;

    // A function to run after transition ends
    this.transitionEnd = (event:TransitionEvent, force:boolean = false) => {

      // Do not trigger on wrong event, only event for component
      if(!force && event.srcElement != element) return;

      // Reset this function
      this.transitionEnd = (event:TransitionEvent) => {};

      // Remove temp element
      this.tempElement.remove();

      //Remove styles
      element.style.cssText = '';

      // Remove transitions
      element.classList.toggle('transition');

      // Reset the overflow value for body
      window.document.body.style.overflow = '';

      // If we have a callback run it after animation finishes
      if(callback) this.raf(()=>{ callback() });

    };

    // Run the transitionend function if forced
    if(force) this.transitionEnd(null, true);

    setTimeout(()=>{

      // Remove shadow after 500ms to time it with other transition
      component.setHasShadow(false);

    }, 500);

    this.raf(()=>{

      // Apply styles to animate to
      element.style.top = this.tempTop + 'px';
      element.style.height = this.tempHeight + 'px';
    });

  }

  static isMobileView() {
    return window.matchMedia('only screen and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2)').matches;
  }

  private onMouseOver(component:PortfolioItemComponent) {

    // Toggle arrows
    if(!PortfolioComponent.isMobileView()) component.toggleArrows();
  }

  private onMouseOut(component:PortfolioItemComponent){

    // Toggle arrows
    if(!PortfolioComponent.isMobileView()) component.toggleArrows();
  }
}
