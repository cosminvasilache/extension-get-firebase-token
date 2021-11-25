export const enum EMessageTypes {
    GET_TOKEN = 'get-token',
}

export interface IMessage {
    type: EMessageTypes;
}
