import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrelineService {
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    init() {
        if (this.isBrowser) {
            import('preline/preline').then(() => {
                if (typeof window !== 'undefined' && window.HSStaticMethods) {
                  window.HSStaticMethods.autoInit();
                }
              });
        }
    }
    
}