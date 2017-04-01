import {Component, OnInit, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs";


@Component({
  selector: 'app-carousel-item',
  templateUrl: 'carousel-item.component.html',
  styleUrls: ['carousel-item.component.scss']
})

//TODO: Rewrite this whole component, does not make sense.
export class CarouselItemComponent implements OnInit {

  @Input() private imageSrc:string;
  @Input() private imageAlt:string;
  @Input() private text:string;
  @Input() private first:boolean;
  @Input() private get onScreen() { return this._onScreen; }
  @Input() private textAlign:string;

  private preloaded = false;
  public readySubject:Subject<any> = new Subject<any>();

  private set onScreen(value:boolean) {

    // If the image is not ready, save variable to be applied on ready
    if(!this._ready) this._temp = value;

    // else if the image is ready but not on screen, set value
    else if(!this._onScreen) this._onScreen = value;
  }

  @Output() onReady: EventEmitter<boolean> = new EventEmitter();
  private _ready = false;

  private set ready(value:boolean){
    this._ready = value;

    // If component is ready
    if(this._ready) this.onReady.emit(null);
  }
  private get ready(){
    return this._ready;
  }

  private _onScreen = true;
  private _temp:boolean;
  private _opacity = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit(){}

  onImageLoad(){

    this.preloaded = true;

    // Set ready to true
    this.ready = true;

    // Set the save variable for _onScreen
    this._onScreen = this._temp;

    // If the item is first in the carousel, show it
    if(this.first) this.show();

    this.readySubject.next(null);

  }

  /*
   * If the image is first in the carousel and
   * not shown for the user, it should be hidden.
   */
  private shouldHide():boolean { return (this.first && !this.onScreen); }
  private hasImage():boolean { return this.imageSrc !== ''; }

  public getOpacity(){ return this._opacity; }
  public hide(){ this._opacity = 0; }
  public show(){ this._opacity = 1; }
  public isReady(){ return this.ready; }
  public getWidth(){ return this.isReady()? this.elementRef.nativeElement.clientWidth : 0; }
}
