import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'signal-form-v1',
        loadComponent: () => import('./signal-form-v1/signal-form-v1').then(v => v.SignalFormV1)
    },
    {
        path: 'signal-form-v2',
        loadComponent: () => import('./signal-form-v2/signal-form-v2').then(v => v.SignalFormV2)
    }
];
