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
    console.log("Creating coffee store in Airtable:", coffeeStore);
    const coffeeAirtableRecords = await fetchAirtableCoffeeStores(id);
    if (coffeeAirtableRecords.length > 0) {
        console.log("Coffee store already exists in Airtable");
    } else {
        console.log("Creating coffee store in Airtable:", {
            id: coffeeStore.id,
            index: coffeeStore.index,
            name: coffeeStore.name,
            address: coffeeStore.address,
            imgUrl: coffeeStore.imgUrl,
            rating: coffeeStore.rating,
            votes: coffeeStore.votes
        });
        const createCoffeeStore = await coffeeStoresTable.create([{
            fields: {
                id: coffeeStore.id || "",
                index: coffeeStore.index || 0,
                name: coffeeStore.name || "not found",
                address: coffeeStore.address || "not found",
                imgUrl: coffeeStore.imgUrl || "not found",
                rating: coffeeStore.rating || 0,
                voting: coffeeStore.votes || 0,
            },
        }]);
        console.log("Created coffee store in Airtable:", minifyRecord(createCoffeeStore as Array<AirtableRecordType>));
        return minifyRecord(createCoffeeStore as Array<AirtableRecordType>);
    }
}