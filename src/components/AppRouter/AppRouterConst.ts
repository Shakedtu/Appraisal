import { lazy, LazyExoticComponent } from 'react';

export interface AppPage {
  id: string;
  path: PagesRoutes;
  component: LazyExoticComponent<any>;
}

export enum PagesRoutes {
  CASE_TABLE = '/',
  CASE = '/case/:id',
}
