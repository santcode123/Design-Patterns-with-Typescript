import { LogType } from "./enums";
import { LoggerSystem } from "./logger/LoggerSystem";

function module1Code() {
    // suppose we want to log the error
    const loggerSystem = LoggerSystem.getInstance();
    const logger = loggerSystem.getLogger();

    logger.log(LogType.ERROR, "This is error in Module 1")
}

function module2Code() {

    // suppose we want to log the wanring
    const loggerSystem = LoggerSystem.getInstance();
    const logger = loggerSystem.getLogger();

    logger.log(LogType.WARNING, "This is warning in Module 2")

}


function clintCode() {
    module1Code();
    module2Code();
}

clintCode();