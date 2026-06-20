import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ErrorCodes } from "@app/models/app/error-code";
import { LanguagesSupported, Root } from "@app/models/app/public-model";

@Injectable({
  providedIn: "root"
})
export class AppDataService {
  language = "en";
  errorCodes = new ErrorCodes();
  
 // Custom fixed application branding variables
  pageTitle = "Confidential Reporting System";
  projectTitle = "Wegagen Speak-Up Platform";
  header_title = "Wegagen Speak-Up Platform";
  
  page = "blank";
  languages_enabled = new Map<string, LanguagesSupported>();
  sidebar = "";
  privacy_badge_open: boolean;
  languages_supported: Map<string, LanguagesSupported>;
  connection: { tor: any };
  languages_enabled_selector: any[];
  ctx: string;
  score: number;
  receivers_by_id: any = {};
  submissionStatuses: any[];
  submission_statuses_by_id: any;
  context_id = "";
  contexts_by_id: any = {};
  questionnaires_by_id: any = {};

  private showLoadingPanelSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  showLoadingPanel$: Observable<boolean> = this.showLoadingPanelSubject.asObservable();

  public publicSubject: BehaviorSubject<Root> = new BehaviorSubject<Root>({} as Root);
  public$: Observable<Root> = this.publicSubject.asObservable();

  constructor() {}

  updateShowLoadingPanel(newValue: boolean) {
    this.showLoadingPanelSubject.next(newValue);
  }

  get public(): Root {
    return this.publicSubject.getValue();
  }

  /**
   * Safe Interception Routine: Overwrites incoming dynamic site names 
   * with static Wegagen Bank branding parameters without modifying deep 
   * data models or breaking data structures needed for anonymous reporting.
   */
  updatePublic(newPublic: Root) {
    if (newPublic && newPublic.node) {
      // 1. Force the dynamic title properties to match our selected brand
      newPublic.node.name = "Wegagen Speak-Up Platform";
      
      // 2. Safely capture if administrative dashboard has overwritten the submission buttons
      if (!newPublic.node.whistleblowing_button) {
        newPublic.node.whistleblowing_button = "Start Report";
      }
    }

    // Broadcast the payload downstream to all Angular observers safely
    this.publicSubject.next({ ...newPublic });
  }
}