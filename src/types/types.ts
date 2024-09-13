export type IOptions = {
    key: string
};

type IStatus = "ON" | "OFF";
type IBaseResponse = {
    success: boolean
    msg: string
};

export type IBaseTransactionsResponse = {
    pay_id: string
    unique_code: string
    status: string
    amount: string
    balance: string
    fee: string
    note: string
    created_at: string
}

export type IBaseTransactionResponse = {
    expired: string
    checkout_url: string
    checkout_url_v2: string
    checkout_url_v3: string
    checkout_url_beta: string
}

export type INewTransactionResponse = {
    data: {
        service: string
        service_name: string
        qr_content: string
        qrcode_url: string
    } & IBaseTransactionsResponse & IBaseTransactionResponse
} & IBaseResponse

export type IStatusTransactionResponse = {
    data: {
        type_fee: string
        via: string
        return_url: string
    } & IBaseTransactionsResponse & IBaseTransactionResponse
    service: {
        id: string
        type: string
        name: string
        minimum: string
        maximum: string
        settlement: string
    }
} & IBaseResponse

export type ICancelTransactionResponse = {
    data: IBaseTransactionsResponse
} & IBaseResponse

export type IProfileResponse = {
    data: {
        full_name: string
        merchant: string
        telephone: string
        email: string
        saldo: string
        saldo_tertahan: number
        auto_wd: IStatus
    }
} & IBaseResponse

export type IPaymentGuideData = {
    title: string
    content: string[]
    last_update: string
}
export type IPaymentGuideResponse = {
    channel_pembayaran: string
    data: IPaymentGuideData[]
} & IBaseResponse

export type IPaymentChannelData = {
    id: string
    name: string
    type: string
    minimum: string
    maximum: string
    fee: string
    settlement: string
    img: string
    status: IStatus
};
export type IPaymentChannelResponse = {
    data: IPaymentChannelData[]
} & IBaseResponse;

export type IRequestSignType = "profile" | "new" | "status" | "cancel" | "payment_channel" | "payment_guide";
export type IRequestSign = {
    profile: string
    new: string
    status: string
    cancel: string
    payment_channel: string
    payment_guide: string
};

export type IRequestPayloadType = "unique_code" | "service" | "amount" | "valid_time" | "merchant_id" | "note" | "payment_guide" | "ewallet_phone" | "costumer_email" | "type_fee" | "callback_count" | "return_url";
export type IRequestPayload = {
    unique_code?: string
    service?: string
    amount?: string
    valid_time?: string
    merchant_id?: string
    note?: string
    payment_guide?: string
    ewallet_phone?: string
    costumer_email?: string
    type_fee?: string
    callback_count?: string
    return_url?: string
};