import { EMessageTypes } from '../models/models';
import { flashGreenBadge, sendMessageToCurrentTabContentScript } from './helpers';

const onClickHandler = () => {
    sendMessageToCurrentTabContentScript({
        type: EMessageTypes.GET_TOKEN,
    });

    flashGreenBadge();
};

chrome.browserAction.onClicked.addListener(onClickHandler);
