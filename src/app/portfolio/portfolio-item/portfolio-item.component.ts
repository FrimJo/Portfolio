import {
  Component, OnInit, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter
} from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {PortfolioComponent} from "../portfolio.component";

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
  @Input() private onCloseClick:(component:PortfolioItemComponent)=>void;

  private height;
  private top;
  private open = false;
  private shadowOpacity = PortfolioComponent.isMobileView()? 0 : 1;

  constructor(private elementRef:ElementRef) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {}

  private isVisible():boolean {

    // Find if fold is bigger then distance from card bottom to top
    let cHeight = this.height = this.elementRef.nativeElement.clientHeight;
    let cOffsetTop = this.elementRef.nativeElement.offsetTop;
    let cDistance = cHeight * 0.7 + cOffsetTop;

    // Get the scroll distance
    let wPageYOffset = window.pageYOffset;
    let wOuterHeight = window.innerHeight;
    let wDistance = wPageYOffset + wOuterHeight;

    return wDistance >= cDistance;
  }

  getHeight():number {
    return this.elementRef.nativeElement.clientHeight;
  }

  getTop():number{
    return this.elementRef.nativeElement.offsetTop - window.pageYOffset;
  }

  getElementRef(){
    return this.elementRef;
  }

  isOpen() {
    return this.elementRef.nativeElement.style.height === '100vh';
    //return this.elementRef.nativeElement.style.position === 'fixed';
  }

  isReady(){
    return this.carousel.isReady();
  }

  toggleArrows(){
    this.carousel.toggleArrows();
  }

  setHasShadow(value:boolean){
    this.shadowOpacity = value? 1 : 0;
  }

  ngOnInit() {}

  ngAfterViewInit(){}

  ngAfterViewChecked(){}


}
