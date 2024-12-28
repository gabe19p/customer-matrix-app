import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// npm run build -- --output-path=dist/customer-matrix-app --base-href /customer-matrix-app/
// ng deploy --base-href=https://gabe19p.github.io/customer-matrix-app/

// attempting publish
// step 1 - ng build --configuration production
