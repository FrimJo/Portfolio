import {
  Component, OnInit, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter
} from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {PortfolioComponent} from "../portfolio.component";
import {Subject} from "rxjs";


@Component({
  selector: 'app-portfolio-item',
  templateUrl: 'portfolio-item.component.html',
  styleUrls: ['portfolio-item.component.scss']
})

export class PortfolioItemComponent implements OnInit {

  @ViewChild('carousel') carousel:CarouselComponent;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @Input() public title:String;
  @Input() public logoSrc:String;
  @Input() public logoAlt:String;
  @Input() public carouselItemsData:Object[];

  private height;
  private top;
  private open = false;
  private _ready = false;
  private shadowOpacity = PortfolioComponent.isMobileView()? 0 : 1;

  public readySubject:Subject<any> = new Subject<any>();

  constructor(private elementRef:ElementRef) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {}

  ngOnInit() {}

  ngAfterViewInit(){
    this._ready = true;
  }

  ngAfterViewChecked(){}

  onSwipeleft() { this.carousel.onRightArrowClick(); }

  onSwiperight() { this.carousel.onLeftArrowClick(); }

  getHeight():number {
    return this.elementRef.nativeElement.clientHeight;
  }

  getTop():number{
    return this.elementRef.nativeElement.offsetTop;
  }

  getElementRef(){
    return this.elementRef;
  }

  isOpen() {
    return this.elementRef.nativeElement.style.height === '100vh';
    //return this.elementRef.nativeElement.style.position === 'fixed';
  }

  public isReady(){
    return this._ready && this.carousel.isReady();
  }

  toggleArrows(){
    this.carousel.toggleArrows();
  }

  setHasShadow(value:boolean){
    this.shadowOpacity = value? 1 : 0;
  }

  private isVisible():boolean {

    // Find if fold is bigger then distance from card bottom to top
    let cHeight = this.height = this.elementRef.nativeElement.clientHeight;
    let cOffsetTop = this.elementRef.nativeElement.offsetTop;
    let cDistance = cHeight * 0.7 + cOffsetTop;

    // Get the scroll distance
    let wPageYOffset = window.pageYOffset;
    let wInnerHeight = window.innerHeight;
    let wDistance = wPageYOffset + wInnerHeight;

    return wDistance >= cDistance;
  }

  private calculateCollapsedScale() {

    const colapsed = this.elementRef.nativeElement.getBoundingClientRect();
    const expanded = {width: window.outerWidth, height: window.outerHeight};

    return {
      x: colapsed.width / expanded.width,
      y: colapsed.height / expanded.height
    };
  }

  public createKeyframeAnimation():string {

    // Figure out the size of the element when collapsed.
    let {x, y} = this.calculateCollapsedScale();
    let animation = '';
    let inverseAnimation = '';

    for (let step = 0; step <= 100; step++) {

      // Remap the step value to an eased one.
      let easedStep = this.ease(step / 100);

      // Calculate the scale of the element.
      const xScale = x + (1 - x) * easedStep;
      const yScale = y + (1 - y) * easedStep;

      animation += `${step}% {
        transform: scale(${xScale}, ${yScale});
      }`;

      // And now the inverse for the contents.
      const invXScale = 1 / xScale;
      const invYScale = 1 / yScale;
      inverseAnimation += `${step}% {
        transform: scale(${invXScale}, ${invYScale});
      }`;

    }

    return `
    @keyframes menuAnimation {
      ${animation}
    }
  
    @keyframes menuContentsAnimation {
      ${inverseAnimation}
    }`;
  }

  private ease (v:number, pow:number=4): number{
    return 1 - Math.pow(1 - v, pow);
  }

}
