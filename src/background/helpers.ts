import { IMessage } from '../models/models';

const getCurrentTab = () => {
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, (tabs) => {
            try {
                const currentTab = tabs[0];
                resolve(currentTab);
            } catch (e) {
                reject(e);
            }
        });
    });
};

export const sendMessageToCurrentTabContentScript = async (message: IMessage) => {
    const currentTab = await getCurrentTab();
    const currentTabId = currentTab.id;
    if (!currentTabId) return;

    chrome.tabs.sendMessage(currentTabId, message);
};

export const flashBadge = (
    badgeText: string,
    badgeColor: chrome.browserAction.BadgeBackgroundColorDetails['color'] | chrome.browserAction.ColorArray,
    timeout = 1_000
) => {
    chrome.browserAction.setBadgeText({
        text: badgeText,
    });
    chrome.browserAction.setBadgeBackgroundColor({
        color: badgeColor,
    });
    setTimeout(() => {
        chrome.browserAction.setBadgeText({
            text: '',
        });
    }, timeout);
};

export const flashGreenBadge = () => {
    flashBadge(
        'LOG',
        'green',
        1_000,
    );
};
