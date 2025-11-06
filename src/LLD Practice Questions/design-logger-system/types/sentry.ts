

export interface SentryType {
    logError(message: string): boolean;
    logInfo(messgae: string): boolean;
    logWarning(message: string): boolean;
}