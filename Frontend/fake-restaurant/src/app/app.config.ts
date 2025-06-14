import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(
      withFetch(), //use the Fetch API instead of XMLHttpRequests
    ),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,              
      closeButton: true,                
      enableHtml: true,
      maxOpened: 3,
      autoDismiss: true,
      newestOnTop: false,
      tapToDismiss: true,         
    }),
    provideAnimations(),
    provideRouter(routes),
    
  ]
};
