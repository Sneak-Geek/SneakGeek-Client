import { AxiosInstance } from "axios";
export declare namespace ApiClient {
    class Builder {
        private isDev;
        private devUrl;
        private prodUrl;
        registerDevUrl(devUrl: string): Builder;
        registerProdUrl(prodUrl: string): Builder;
        registerDevState(isDev: boolean): Builder;
        build(): Instance;
    }
    class Instance {
        private axiosInstance;
        constructor(axiosIsnt: AxiosInstance);
        getInstance(): AxiosInstance;
    }
}
