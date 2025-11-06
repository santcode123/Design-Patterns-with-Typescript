import { ErrorLogger } from "./ErrorLogger";
import { InfoLogger } from "./InfoLogger";
import { Logger } from "./Logger";
import { WarningLogger } from "./WarningLogger";


export class LoggerSystem {
    private static instance: LoggerSystem;
    private loggerInstance: Logger;


    private constructor() {
        this.loggerInstance = new ErrorLogger(new InfoLogger(new WarningLogger()));
    }

    public static getInstance() {
        if (!this.instance) {
            LoggerSystem.instance = new LoggerSystem();
        }
        return LoggerSystem.instance;
    }

    public getLogger() {
        return this.loggerInstance;
    }
}