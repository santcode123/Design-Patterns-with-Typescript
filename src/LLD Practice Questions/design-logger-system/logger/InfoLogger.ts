import { LogType } from "../enums";
import { Logger } from "./Logger";



export class InfoLogger extends Logger {
    public log(type: LogType, message: string): void {
        if (type === LogType.INFO) {
            this.sentryLogger.logInfo(message);
        } else {
            super.logNext(type, message);
        }
    }
}