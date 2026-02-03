import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="show">
      <span class="toast-message">{{ message }}</span>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 320px;
      max-width: 90vw;
      background: rgba(0, 123, 255, 0.18);
      color: #fff;
      padding: 32px 40px;
      border-radius: 18px;
      box-shadow: 0 4px 32px rgba(0,0,0,0.18);
      font-size: 1.25rem;
      font-weight: bold;
      letter-spacing: 0.5px;
      text-align: center;
      z-index: 1000;
      animation: fadein 0.3s, fadeout 0.3s 2.7s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      backdrop-filter: blur(2px);
    }
    .toast-message {
      color: #fff;
      background: rgba(0, 123, 255, 0.92);
      padding: 10px 24px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      font-size: 1.35rem;
      font-weight: bold;
      text-shadow: 0 2px 8px rgba(0,0,0,0.10);
    }
    @keyframes fadein {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes fadeout {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @media (max-width: 600px) {
      .toast {
        min-width: 180px;
        padding: 18px 6px;
        font-size: 1rem;
        border-radius: 10px;
      }
      .toast-message {
        font-size: 1.05rem;
        padding: 8px 10px;
        border-radius: 7px;
      }
    }
  `]
})
export class ToastComponent {
  @Input() message = '';
  @Input() show = false;
}
