import { CoffeeShopType } from '@/types/coffee-store-types';
import Airtable, { Record, Error, FieldSet } from 'airtable';

export const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appmKm3RahPdo3BW2');
export const coffeeStoresTable = base('coffee-stores');

export type AirtableRecordType = Record<FieldSet> & {
    fields: CoffeeShopType;
    recordId: string;
};

export const minifyRecord = (records: Array<AirtableRecordType>) => {
    return records.map((record) => {
        return {
            recordId: record.id,
            ...record.fields,
        }
    });
}

export const fetchAirtableCoffeeStores = async (id: string) => {
    try {
        const findRecords = await coffeeStoresTable.select({
            filterByFormula: `{id} = '${id}'`,
        }).firstPage();
        return minifyRecord(findRecords as Array<AirtableRecordType>);
    } catch (error) {
        console.error("Error fetching from Airtable:", error);
        return [];
    }
}

export const createCoffeeStore = async (coffeeStore: CoffeeShopType, id: string) => {
    const coffeeAirtableRecords = await fetchAirtableCoffeeStores(id);
    if (coffeeAirtableRecords.length > 0) {
        console.log("Coffee store already exists in Airtable");
    } else {
        const createCoffeeStore = await coffeeStoresTable.create([{
            fields: {
                id: coffeeStore.id,
                name: coffeeStore.name,
                address: coffeeStore.address,
                imgUrl: coffeeStore.imgUrl,
                rating: coffeeStore.rating,
                voting: coffeeStore.votes || 0,
            },
        }]);
        return minifyRecord(createCoffeeStore as Array<AirtableRecordType>);
    }
}