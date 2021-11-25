const CONSOLE_LOG_FORMAT = [
    'font-size: 32px',
    'font-weight: bold',
    'color: white',
    'background-color: black',
    'padding: 0.5em',
    'border-radius: 0.25em',
].join('; ');

export const fancyLog = (header: string, ...rest: unknown[]) => {
    console.log(`%c${header}`, CONSOLE_LOG_FORMAT, ...rest);
};
