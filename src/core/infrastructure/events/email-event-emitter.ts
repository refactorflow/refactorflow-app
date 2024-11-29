import { EventEmitter } from 'node:events';

type EmailEventType = 'email:error' | 'email:success';

interface EmailEvent {
  type: 'EMAIL_SEND_ERROR' | 'EMAIL_SEND_FAILED' | 'EMAIL_SENT';
  message?: string;
  messageId?: string;
  timestamp: Date;
}

export class EmailEventEmitter {
  private static instance: EmailEventEmitter;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter();
  }

  public static getInstance(): EmailEventEmitter {
    if (!EmailEventEmitter.instance) {
      EmailEventEmitter.instance = new EmailEventEmitter();
    }
    return EmailEventEmitter.instance;
  }

  public emit(event: EmailEventType, data: EmailEvent): void {
    this.emitter.emit(event, data);
  }

  public on(event: EmailEventType | 'email:*', listener: (data: EmailEvent) => void): void {
    this.emitter.on(event, listener);
  }

  public off(event: EmailEventType, listener: (data: EmailEvent) => void): void {
    this.emitter.off(event, listener);
  }

  // Utile pour les tests
  public removeAllListeners(): void {
    this.emitter.removeAllListeners();
  }
}
