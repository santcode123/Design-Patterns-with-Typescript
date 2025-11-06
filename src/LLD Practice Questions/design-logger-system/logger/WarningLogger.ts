import { LogType } from "../enums";
import { Logger } from "./Logger";



export class WarningLogger extends Logger {
    public log(type: LogType, message: string): void {
        if (type === LogType.WARNING) {
            this.sentryLogger.logWarning(message);
        } else {
            this.logNext(type, message);
        }
    }
}