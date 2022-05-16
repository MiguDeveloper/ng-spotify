import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () =>
      import('@module/tracks/tracks.module').then((m) => m.TracksModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('@module/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: 'history',
    loadChildren: () =>
      import('@module/history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: '**',
    redirectTo: 'tracks',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
