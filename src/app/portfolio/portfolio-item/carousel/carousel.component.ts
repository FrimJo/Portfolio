import {
  Component, OnInit, Input, ElementRef, ViewChild, QueryList,
  ViewChildren, Output, EventEmitter
} from '@angular/core';
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";

@Component({
  selector: 'app-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  // Get first carousel item child
  @ViewChildren('carouselItemChild') carouselChildren:QueryList<CarouselItemComponent>;
  @ViewChild('carouselItemChild') firstCarouselItem:CarouselItemComponent;
  @ViewChild('leftArrow') leftArrow:ElementRef;
  @ViewChild('rightArrow') rightArrow:ElementRef;

  @Input() private carouselItemsData:Object[];
  @Input() private showImage = false;

  @Output() onReady: EventEmitter<boolean> = new EventEmitter();
  private _ready = false;

  private set ready(value:boolean){
    this._ready = value;

    // If component is ready
    if(this._ready && this.firstCarouselItem.isReady()) this.onReady.emit(null);
  }
  private get ready(){
    return this._ready;
  }

  private _isActive = false;
  private _index = 0;

  private get showLeftArrow(){ return this._isActive && this._index > 0? 1 : 0; }
  private get showRightArrow(){ return this._ready &&  this._isActive && this._index < this.carouselChildren.length-1? 1: 0; }

  private set index(value:number){

    // If the card is not active, then we can't navigate
    if(!this._isActive) return;

    // Make sure the new index can never be lower the zero and bigger then number of carousel items
    this._index = value < 0? 0 : value > this.carouselChildren.length-1? this.carouselChildren.length-1 : value;
  }

  private get index(){ return this._index; }

  private get width(){ return this.isReady()? this.firstCarouselItem.getWidth() : 10; }

  private get transform() {
    return 'translate(-' + this.width * this.index + 'px, 0)';
  }

  private childIsReady(component:CarouselItemComponent, isFirst){
    if(isFirst && this.ready) this.onReady.emit(null);
  }

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(){
    this.ready = true;
  }

  public isReady(){

    return this.ready && this.firstCarouselItem.isReady();
  }

  public toggleArrows() {
    this._isActive = !this._isActive;
  }

  public onLeftArrowClick(){

    // Hide current item
    let currentItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    currentItem.hide();

    this.index--;

    // Show new item
    let newItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    newItem.show();

  }
  public onRightArrowClick(){

    // Hide current item
    let currentItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    currentItem.hide();

    this.index++;

    // Show new item
    let newItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    newItem.show();
  }

  private isToFill(index:number): boolean {
    return index == this._index;
  }

  private onCircleClick(index:number): void {
    this.index = index;
  }

  private getOpacity(index:number): number {
    return index == this._index? 1 : 0;
  }
}
