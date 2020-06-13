import { lazy, LazyExoticComponent } from 'react';

export interface AppPage {
  id: string;
  path: PagesRoutes;
  component: LazyExoticComponent<any>;
}

export enum PagesRoutes {
  HOME = '/',
  CASE_TABLE = '/cases',
  CASE = '/case/:id',
}
