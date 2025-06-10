import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { GetFormComponent } from './components/get-form/get-form.component';
import { AdministrationFormsComponent } from './components/administration-forms/administration-forms.component';
import { LinksPublishedFormComponent } from './components/links-published-form/links-published-form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'create-form',
        component: CreateFormComponent
    },
    {
        path: 'get-form',
        component: GetFormComponent
    },
    {
        path: 'administration-forms',
        component: AdministrationFormsComponent
    },
    {
        path: 'links-published-form',
        component: LinksPublishedFormComponent
    }
];
