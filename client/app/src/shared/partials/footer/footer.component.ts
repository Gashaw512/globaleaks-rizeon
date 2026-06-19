import { Component, inject } from "@angular/core";
import { AppDataService } from "@app/app-data.service";

import { MarkdownComponent } from "ngx-markdown";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { StripHtmlPipe } from "@app/shared/pipes/strip-html.pipe";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  standalone: true,
  imports: [
    MarkdownComponent,
    TranslateModule,
    TranslatorPipe,
    StripHtmlPipe
  ]
})
export class FooterComponent {

  private readonly appDataService = inject(AppDataService);

  /**
   * Safely expose node data for template usage
   * (prevents template from directly coupling to global state structure)
   */
  get node() {
    return this.appDataService.public?.node ?? null;
  }

  /**
   * Optional: platform name for branding consistency
   */
  readonly platformName = "Wegagen Speak-Up Platform";
}