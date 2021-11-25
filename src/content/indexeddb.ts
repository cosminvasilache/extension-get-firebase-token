const TRANSACTION_MODES = {
    READ_ONLY: 'readonly',
    READ_WRITE: 'readwrite',
    VERSION_CHANGE: 'versionchange',
} as const;

const doesDbExist = async (dbName: string) => {
    const dbs = await indexedDB.databases();
    const foundDb = dbs.find((db) => {
        return db.name === dbName;
    });
    return !!foundDb;
};

const getOpenDb = (dbName: string): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const DBOpenRequest = indexedDB.open(dbName);
        DBOpenRequest.onsuccess = (openEvent) => {
            // @ts-expect-error not a generic Event type
            const db = openEvent.target?.result as IDBDatabase;
            resolve(db);
        };
        DBOpenRequest.onerror = (openError) => {
            reject(openError);
        };
    });
};

const getDb = async (dbName: string) => {
    if (!(await doesDbExist(dbName))) {
        return null;
    }

    return getOpenDb(dbName);
};

export const getAll = async <T>(dbName: string, storeName: string): Promise<T[] | null>  => {
    const db = await getDb(dbName);
    if (db === null) {
        return null;
    }

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, TRANSACTION_MODES.READ_ONLY);
        transaction.onerror = (transactionError) => {
            reject(transactionError);
        };
        const store = transaction.objectStore(storeName);
        const storeRequest = store.getAll();
        storeRequest.onsuccess = (storeRequestSuccessEvent) => {
            // @ts-expect-error not a generic Event type
            const value = storeRequestSuccessEvent.target?.result as T[];
            resolve(value);
        };
        storeRequest.onerror = (storeRequestError) => {
            reject(storeRequestError);
        };
    });
};
