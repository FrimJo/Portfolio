
import {Injectable} from "@angular/core";
import {PortfolioItemComponent} from "./portfolio-item/portfolio-item.component";

var ID = 0;

@Injectable()
export class PortfolioService {

  private activePortfolioItemComponent: PortfolioItemComponent;
  public id = ID++;

  setActiveComponent(component:PortfolioItemComponent){
    if(component == null) throw 'cant set active component to null, use removeActiveComponent()';

    this.activePortfolioItemComponent = component;
  }

  getActiveComponent(){
    return this.activePortfolioItemComponent;
  }

  removeActiveComponent(){
    this.activePortfolioItemComponent = null;
  }

  hasActiveComponent(){
    return this.activePortfolioItemComponent != null;
  }

}
