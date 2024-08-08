import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    loadFlowbite(callback: (flowbite: any) => void) {
        if (this.isBrowser) {
            import('flowbite').then(flowbite => {
                callback(flowbite);
            });
        }
    }

    initDatepicker() {
    if (this.isBrowser) {
        import('flowbite-datepicker').then(module  => {
            const Datepicker = module.default;
            // Initialiser votre datepicker ici
        });
        }
    }
}