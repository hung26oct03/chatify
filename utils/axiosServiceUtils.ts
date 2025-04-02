import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface AxiosServiceConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
}

class AxiosService {
    private instance: AxiosInstance;
    private bearerToken: string | null = null;

    constructor(config: AxiosServiceConfig = {}) {
        this.instance = axios.create({
            baseURL: config.baseURL,
            timeout: config.timeout || 10000,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers,
            },
        });

        this.instance.interceptors.request.use(
            (config) => {
                if (this.bearerToken) {
                    config.headers['Authorization'] = `Bearer ${this.bearerToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => this.handleError(error)
        );
    }

    public setBearerToken(token: string | null) {
        this.bearerToken = token;
    }

    public get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.get(url, config);
    }

    public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.post(url, data, config);
    }

    public patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.instance.patch(url, data, config);
    }

    public postFormData(
        url: string,
        formData: FormData,
        config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse> {
        const formConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...config.headers,
                'Content-Type': 'multipart/form-data',
            },
        };
        return this.instance.post(url, formData, formConfig);
    }

    private handleError(error: AxiosError): Promise<never> {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                console.log('Network Error!');
                return Promise.reject({ status: 'Network Error', data: null });
            }

            const { status } = error.response;
            switch (status) {
                case 400:
                    console.log('Bad Request!');
                    return Promise.reject({ status: 400, data: null });
                case 401:
                    console.log('Unauthorized!');
                    return Promise.reject({ status: 401, data: null });
                case 500:
                    console.log('Server Error!');
                    return Promise.reject({ status: 500, data: null });
                default:
                    console.log(`Unhandled error status: ${status}`);
                    return Promise.reject(error.response);
            }
        }
        return Promise.reject(error);
    }
}

const axiosService = new AxiosService({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15000,
});

export default axiosService;