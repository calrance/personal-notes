import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly title = signal('personal-note-taking');
  protected readonly isMobile = signal(false);
  protected readonly isMobileWarningDismissed = signal(false);
  protected readonly showMobileWarning = computed(
    () => this.isMobile() && !this.isMobileWarningDismissed()
  );

  ngOnInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateMobileState = () => this.isMobile.set(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    this.destroyRef.onDestroy(() => {
      mediaQuery.removeEventListener('change', updateMobileState);
    });
  }

  protected dismissMobileWarning(): void {
    this.isMobileWarningDismissed.set(true);
  }
}
