import { SentryType } from "../types/sentry";


export class SentryLogger implements SentryType {
    logError(message: string): boolean {
        console.log("Error Logged to sentry:", message);
        return true;
    }

    logInfo(messgae: string): boolean {
        console.log("Info logged to sentry: ", messgae);
        return true;
    }

    logWarning(message: string): boolean {
        console.log("Warning logged to sentry:", message);
        return true;
    }
}