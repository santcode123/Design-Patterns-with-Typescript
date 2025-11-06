import { LogType } from "../enums";
import { Logger } from "./Logger";


export class ErrorLogger extends Logger {
    public log(type: LogType, message: string) {
        if (type === LogType.ERROR) {
            this.sentryLogger.logError(message);
        } else {
            super.logNext(type, message);
        }
    }
}