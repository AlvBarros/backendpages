import { Service } from "../../../business/templates/Service";

export class Logger extends Service {

    public Blue: string = "\x1b[34m";
    public Red: string = "\x1b[31m";
    public Yellow: string = "\x1b[33m";
    public White: string = "\x1b[37m";
    public Green: string = "\x1b[32m";

    public LogObj(obj: object, name?: string): void {
        console.log(`${!!name ? name : "OBJECT"}: `);
        console.log(obj);
    }

    public Log(line: { text: string; color: string; }): void {
        this.LogText([line]);
    }

    public LogText(lines: Array<{ text: string; color: string; }>): void {
        lines.map((line) => {
            console.log(this.ColorfulLine(line));
        });
    }

    public ColorfulLine(line: { text: string, color: string }): string {
        return `${line.color + line.text + "\x1b[0m"}`;
    }

    public LogOnOneLine(lines: Array<{ text: string; color: string; }>): void {
        let result = "";
        lines.map((line) => {
            result += this.ColorfulLine(line);
        });
        console.log(result);
    }
}

export default Logger;
