
import { LogType } from "../enums"
import { SentryLogger } from "../third-party/sentry";

export abstract class Logger {
    private nextLogger: Logger | null = null;
    protected sentryLogger: SentryLogger;
    // Note that depedency inject is better compare to hard coing the sentry as we might use different third party logging service so pass it in constructor
    constructor(nextLogger?: Logger, sentryLogger: SentryLogger = new SentryLogger()) {
        console.log("Abstarct constructor has been called");
        this.nextLogger = nextLogger || null;
        this.sentryLogger = sentryLogger;
    }

    protected logNext(type: LogType, message: string): void {
        if (this.nextLogger) this.nextLogger.log(type, message);
    }

    public abstract log(type: LogType, message: string): void;
}