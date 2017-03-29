import {RouterModule} from "@angular/router";
import {PortfolioComponent} from "./portfolio/portfolio.component";
const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PortfolioComponent },
  { path: 'united-colors', data: {title: 'United Colors'}, component: PortfolioComponent },
  { path: 'varramie', data: {title: 'Varramie'}, component: PortfolioComponent },
  { path: 'upload', data: {title: 'UpLoad'}, component: PortfolioComponent },
  { path: 'room-booking', data: {title: 'Room Booking'}, component: PortfolioComponent },
  { path: 'holocare', data: {title: 'HoloCare'}, component: PortfolioComponent },
  { path: '**', redirectTo: 'home' }
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true
});
