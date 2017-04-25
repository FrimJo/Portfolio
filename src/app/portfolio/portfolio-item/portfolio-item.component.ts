import {
  Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter
} from '@angular/core';
import {CarouselComponent} from "./carousel/carousel.component";
import {PortfolioComponent} from "../portfolio.component";
import {Subject} from "rxjs";

class ReadyController {

  private _ready = false;
  private _subject:Subject<boolean> = new Subject<boolean>();
  private _param = null;

  private setReady(){
    this._ready = true;
    this._subject.next(this._param);
  }

  public isReady(){
    return this._ready;
  }

  public onReady(next:(value:boolean)=>void){
    this._subject.subscribe(next);
  }

  public whenReady(next:(value:boolean)=>void){
    if(this._ready) next(this._param);
    else this._subject.subscribe(next);
  }
}

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

}
