import { NS } from "@ns";

type ILogger = {
    debug: (_: string) => void;
    log: (_: string) => void;
    warn: (_: string) => void;
    error: (_: string) => void;
    fatal: (_: string) => void;
};

export default class logger implements ILogger {
    public name: string;
    private ns: NS;
    constructor(name: string, ns: NS) {
        this.name = name;
        this.ns = ns;
    }

    public debug(message: string) {
        this.ns.tprint(`[DEBUG] ${message}`);
    }
    public log(message: string) {
        this.ns.tprint(`[LOG] ${message}`);
    }
    public warn(message: string) {
        this.ns.tprint(`[WARN] ${message}`);
    }
    public error(message: string) {
        this.ns.tprint(`[ERROR] ${message}`);
    }
    public fatal(message: string) {
        this.ns.tprint(`[FATAL] ${message}`);
        this.ns.exit();
    }
}
