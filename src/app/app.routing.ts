import {RouterModule} from "@angular/router";
import {PortfolioComponent} from "./portfolio/portfolio.component";
const routes = [
  { path: '', redirectTo: 'home/', pathMatch: 'full' },
  { path: 'home', redirectTo: 'home/', pathMatch: 'full' },
  { path: 'home/:title', component: PortfolioComponent },
//  { path: '**', component: PortfolioComponent }
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: false
});
