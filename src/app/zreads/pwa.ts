import { SwUpdate } from "@angular/service-worker";
import { filter, map } from "rxjs";

export class AppComponent {
  appData: any;
  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(
        filter((event) => event.type === "VERSION_READY"),
        map((event: any) => event.latestVersion.appData)
      )
      .subscribe((appData) => (this.appData = appData));
  }
}

//   private subscribeToUpdates(swUpdate: SwUpdate) {
//     swUpdate.versionUpdates.subscribe((event: VersionEvent) => {
//       console.log("versionUpdates event", event);
//       if (event.type === "VERSION_READY") {
//         const version = event.latestVersion;
//         this.newVersion = version.appData
//           ? JSON.stringify(version.appData)
//           : version.hash;
//       }
//     });
//   }
//   private checkForUpdates(swUpdate: SwUpdate) {
//     const oneMinute = 1000 * 60;
//     interval(oneMinute).subscribe(() => swUpdate.checkForUpdate());
//   }

//   onReloadClick() {
//     window.location.reload();
//   }
// }
