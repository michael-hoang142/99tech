import * as fs from 'fs';
import { EnvUtils } from './env-utils';
export class G_CONFIG {
    private static CONFIG_ENV_PROPERTY_NAME = 'TESTS_ENV_CONFIG';

    private static CURRENT_CONFIG_FILE_LOCATION = 'default.json'

    private static ORANGE_HRM_DEMO = 'config/orange-hrm-demo.json';


    public static baseUrl: string;
    public static env: string;
    public static tenant: string;
    public static account: {
        username: string,
        password: string
    }

    public static _initialize() {
        let providedEnvVal = EnvUtils.getEnvString(G_CONFIG.CONFIG_ENV_PROPERTY_NAME);

        switch (providedEnvVal?.toLowerCase()) {
            case 'orange-hrm-demo': {
                G_CONFIG.CURRENT_CONFIG_FILE_LOCATION = G_CONFIG.ORANGE_HRM_DEMO;
                break;
            }
            default:
                throw new Error(
                    'Provided config variable with name := [' +
                    G_CONFIG.CONFIG_ENV_PROPERTY_NAME +
                    '] has value := [' +
                    providedEnvVal +
                    '] processing is not supported yet'
                );
        }
        Object.assign(this, JSON.parse(fs.readFileSync(G_CONFIG.CURRENT_CONFIG_FILE_LOCATION, 'utf-8')));
    }
}

G_CONFIG._initialize();
