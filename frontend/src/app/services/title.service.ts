import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    private baseTitle: string = 'IPSUM App';
    private titleSubject = new Subject<string>();

    title$ = this.titleSubject.asObservable();

    setTitle(newTitle: string) {
        this.titleSubject.next(`${this.baseTitle} - ${newTitle}`);
    }

    resetTitle() {
        this.titleSubject.next(this.baseTitle);
    }
}