import AppConfig from "./AppConfig";

let app;

if (process.argv.length > 2) {
    if (process.argv[2] === "dev") {
        app = new AppConfig("dev");
    }
} else {
    app = new AppConfig();
}
