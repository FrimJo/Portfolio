import {
  Component, OnInit,
  transition, ElementRef, Input, ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import {PortfolioItemComponent} from "./portfolio-item/portfolio-item.component";
import {setTimeout} from "timers";

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
      { imageSrc: '../../assets/images/united_colors-pixel-black.min.png', imageAlt: '1A', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
      { imageSrc: '../../assets/images/united_colors-pixel-black.min.png', imageAlt: '2A', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
    ]
  },
  {
    title: 'Varramie',
    logoSrc: '../../assets/images/logo-empty-grey.min.svg',
    logoAlt: '',
    carouselItemsData:[
    { imageSrc: '../../assets/images/placeholder-mockup-google_pixel-black-1000x860.png', imageAlt: '1B', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'},
    { imageSrc: '../../assets/images/placeholder-mockup-google_pixel-black-1000x860.png', imageAlt: '2B', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo'}
    ]
  },
  {
    title: 'Room Booking',
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
  styleUrls: ['./portfolio.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class PortfolioComponent implements OnInit {

  @ViewChild('wrapper') wrapper;

  private tempElement = document.createElement('div');
  private tempTop;
  private tempHeight;

  private raf = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame;

  private contentData = CONTENTDATA;

  private transitionEnd = (event:TransitionEvent)=> {};

  constructor(private element:ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit() { }

  private openCard(component:PortfolioItemComponent){

    // If the we are not in mobile view or the component is not ready, or the component is already open, end function.
    if(!PortfolioComponent.isMobileView() || !component.isReady() || component.isOpen()) return;

    // Get card height and to, and save it for later use
    this.tempTop = component.getTop();
    this.tempHeight = component.getHeight();

    // Set height of temp element to card height
    this.tempElement.style.height = this.tempHeight + 'px';

    // Get nativeElement of the component
    let element = component.getElementRef().nativeElement;

    // Set styles
    element.style.cssText = 'position: fixed; top: '+this.tempTop+'px; height: '+this.tempHeight+'px; z-index: 100';

    // Add temp element before card
    element.parentNode.insertBefore(this.tempElement, element);

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

  private closeCard(component:PortfolioItemComponent){

    // If the component is not open, end function
    if(!component.isOpen()) return;

    // Toggle arrows
    component.toggleArrows(); // TODO: Replace in component with isOpen

    let element = component.getElementRef().nativeElement;

    // A function to run after transition ends
    this.transitionEnd = (event:TransitionEvent) => {

      // Do not trigger on wrong event, only event for component
      if(event.srcElement != element) return;

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

    };

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
    return window.matchMedia('only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2)').matches;
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
