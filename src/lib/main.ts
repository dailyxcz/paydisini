import crypto from "node:crypto";

import axios from "axios";
import { ICancelTransactionResponse, INewTransactionResponse, IOptions, IPaymentChannelResponse, IPaymentGuideResponse, IProfileResponse, IRequestPayload, IRequestPayloadType, IRequestSign, IRequestSignType, IStatusTransactionResponse } from "../types/types";

export class PayDisini {

    private options: IOptions;
    private baseUrl: string = "https://paydisini.co.id/api/";
    constructor(options: IOptions) {
        this.options = options;
    }

    private md5(input: string): string {
        const hash = crypto.createHash("md5");
        hash.update(input);

        return hash.digest("hex");
    }

    private sign_value(payload?: IRequestPayload): IRequestSign {
        return {
            profile: "Profile",
            payment_channel: `PaymentChannel`,
            cancel: `${payload?.unique_code}CancelTransaction`,
            payment_guide: `${payload?.service}PaymentGuide`,
            status: `${payload?.unique_code}StatusTransaction`,
            new: `${payload?.unique_code}${payload?.service}${payload?.amount}${payload?.valid_time}NewTransaction`,
        };
    }

    private async request(requestType: IRequestSignType, payload?: IRequestPayload) {
        const payloads = new FormData();
        payloads.append("key", this.options.key);
        payloads.append("signature", this.md5(`${this.options.key}${this.sign_value(payload)[requestType]}`));
        payloads.append("request", requestType);
        for (const key in payload) {
            if (payload[key as IRequestPayloadType])
                payloads.append(key, payload[key as IRequestPayloadType]!);
        }
        const response = await axios({
            method: "POST",
            url: this.baseUrl,
            data: payloads,
            proxy: this.options.proxy,
        });

        return response.data;
    }

    public async paymentChannel(): Promise<IPaymentChannelResponse> {
        return await this.request("payment_channel") as unknown as IPaymentChannelResponse;
    }

    public async paymentGuide(service: string): Promise<IPaymentGuideResponse> {
        return await this.request("payment_guide", { service }) as unknown as IPaymentGuideResponse;
    }

    public async profile() {
        return await this.request("profile") as unknown as IProfileResponse
    }

    public async new_transaction(payload: IRequestPayload) {
        return await this.request("new", payload) as unknown as INewTransactionResponse
    }

    public async status_transaction(unique_code: string) {
        return await this.request("status", { unique_code }) as unknown as IStatusTransactionResponse
    }

    public async cancel_transaction(unique_code: string) {
        return await this.request("cancel", { unique_code }) as unknown as ICancelTransactionResponse
    }

}