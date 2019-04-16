import { Injectable, ErrorHandler } from "@angular/core";
import { environment } from "../../../../environments/environment";

const CONFIG_VARS = {
    'API_URL': environment.API_URL
}

@Injectable()
export class ConfigurationService {

    static getVars() {
        return CONFIG_VARS;
    }

    static getVar(key) {
        return CONFIG_VARS[key];
    }
}
