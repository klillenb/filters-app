import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterReloadService {
  reload = signal(0);

  trigger() {
    this.reload.update((v) => v + 1);
  }
}
