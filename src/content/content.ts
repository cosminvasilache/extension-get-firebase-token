import { EMessageTypes, IMessage } from '../models/models';
import { addTextToClipboard } from './clipboard';
import { getFirebaseToken } from './firebase';
import { fancyLog } from './helpers';

const CONSOLE_LOG_HEADER = 'Get Firebase Token';

const getToken = async () => {
    const firebaseToken = await getFirebaseToken();
    fancyLog(CONSOLE_LOG_HEADER, firebaseToken);

    if (firebaseToken !== null) {
        await addTextToClipboard(firebaseToken)
            .then(() => {
                fancyLog(CONSOLE_LOG_HEADER, 'token copied to clipboard');
            })
            .catch((e) => {
                console.warn(CONSOLE_LOG_HEADER, '. Unable to copy to clipboard:', e);
            });
    }
};

chrome.runtime.onMessage.addListener((request: IMessage) => {
    if (request.type === EMessageTypes.GET_TOKEN) {
        getToken();
    }
});
