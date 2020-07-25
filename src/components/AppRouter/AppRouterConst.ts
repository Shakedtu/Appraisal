import { LazyExoticComponent } from 'react';

export interface AppPage {
  key: string;
  path: PagesRoutes;
  component: LazyExoticComponent<any>;
}

export enum PagesRoutes {
  HOME = '/',
  CASE_TABLE = '/cases',
  CASE = '/case/:id',
  TEST_ENDPOINTS = '/test',
}
