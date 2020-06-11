import {lazy, LazyExoticComponent} from "react";

export interface AppPage {
    id: string;
    path: string;
    component: LazyExoticComponent<any>;
}

export const PagesRoutes = {
    caseTable: '/',
    contactInfo: '/contact-info',

}