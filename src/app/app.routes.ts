import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    pathMatch: "full",
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule)
  }
];
