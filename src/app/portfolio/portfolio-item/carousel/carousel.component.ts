import {
  Component, OnInit, Input, ElementRef, ViewChild, HostListener, animate, QueryList,
  ViewChildren
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

  private _isActive = false;
  private _index = 0;
  private _ready = false;

  private get showLeftArrow(){ return this._isActive && this._index > 0? 1 : 0; }
  private get showRightArrow(){ return this._ready &&  this._isActive && this._index < this.carouselChildren.length-1? 1: 0; }

  private set index(value:number){

    // Make sure the new index can never be lower the zero and bigger then number of carousel items
    this._index = value < 0? 0 : value > this.carouselChildren.length-1? this.carouselChildren.length : value;
  }

  private get index(){ return this._index; }

  private get width(){ return this.isReady()? this.firstCarouselItem.getWidth() : 10; }

  private get transform() {
    return 'translate(-' + this.width * this.index + 'px, 0)';
  }

  constructor(private elementRef:ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit(){
    this._ready = true;
  }

  public isReady(){

    return this._ready && this.firstCarouselItem.isReady();
  }

  public toggleArrows() {
    this._isActive = !this._isActive;
  }

  private onLeftArrowClick(){

    // Hide current item
    let currentItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    currentItem.hide();

    this.index--;

    // Show new item
    let newItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    newItem.show();

  }
  private onRightArrowClick(){

    // Hide current item
    let currentItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    currentItem.hide();

    this.index++;

    // Show new item
    let newItem = this.carouselChildren.find( (item, index) => { return index == this.index; });
    newItem.show();
  }
}
