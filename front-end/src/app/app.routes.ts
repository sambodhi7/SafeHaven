import { Routes } from '@angular/router';

import { VoicesOfWarComponent } from './pages/voices-of-war/voices-of-war.component';
export const routes: Routes = [
    {
        path:'',
        pathMatch: 'full',
        loadComponent : ()=>import("./pages/home/home.component").then(c=>c.HomeComponent)
    },
    {
        path: 'voices-of-war',
        loadComponent() {
            return import('./pages/voices-of-war/voices-of-war.component').then(c => c.VoicesOfWarComponent)
        },
    },
    {
        path: 'clear-cut',
        loadComponent() {
            return import('./pages/clear-cut/clear-cut.component').then(c => c.ClearCutComponent)
        }
    },
    {
        path: 'echoes-of-silence',
        loadComponent() {
            return import("./pages/echoe-of-silence/echoe-of-silence.component").then(c=>c.EchoeOfSilenceComponent)
        }
    },
    {
        path: 'frontline-lens',
        loadComponent() {
            return import("./pages/frontline-lens/frontline-lens.component").then(c=>c.FrontlineLensComponent)}

    },
    {
        path : 'where-names-rest',
        loadComponent() {
            return import("./pages/where-names-rest/where-names-rest.component").then(c=>c.WhereNamesRestComponent)
        }
    },
    {
        path:'add',
        loadComponent() {
            return import("./components/add-front-line-lens-form/add-front-line-lens-form.component").then(c=>c.AddFrontLineLensFormComponent)
        },
    },
    {
      path: 'ngo-dashboard',
      loadComponent() {
        return import('./pages/ngo-dashboard/ngo-dashboard.component').then(c => c.NgoDashboardComponent)
      }
    },
    {
      path: 'avail-help',
      loadComponent() {
        return import('./pages/avail-help/avail-help.component').then(c => c.AvailHelpComponent)
      }
    }
];
