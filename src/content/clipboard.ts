export const addTextToClipboard = (text: string) => {
    return navigator.clipboard.writeText(text);
};
