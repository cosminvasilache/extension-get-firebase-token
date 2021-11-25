import { EMessageTypes, IMessage } from '../models/models';
import { getFirebaseToken } from './firebase';
import { fancyLog } from './helpers';

const getToken = async () => {
    const firebaseToken = await getFirebaseToken();
    fancyLog('firebaseToken', firebaseToken);
};

chrome.runtime.onMessage.addListener((request: IMessage) => {
    if (request.type === EMessageTypes.GET_TOKEN) {
        getToken();
    }
});
