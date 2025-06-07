import { CoffeeShopType } from '@/types/coffee-store-types';
import Airtable, { Record, FieldSet } from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appmKm3RahPdo3BW2');
const coffeeStoresTable = base('coffee-stores');

type AirtableRecordType = Record<FieldSet> & {
    fields: CoffeeShopType;
    recordId: string;
};

const minifyRecord = (records: AirtableRecordType[]) => {
    return records.map((record) => ({
        recordId: record.id,
        ...record.fields,
    }));
};

const fetchAirtableCoffeeStores = async (id: string) => {
    try {
        const findRecords = await coffeeStoresTable
            .select({
                filterByFormula: `{id} = '${id}'`,
            })
            .firstPage();
        return minifyRecord(findRecords as AirtableRecordType[]);
    } catch (error) {
        console.error("Error fetching from Airtable:", error);
        return [];
    }
};

const createCoffeeStore = async (coffeeStore: CoffeeShopType, id: string) => {
    const existingRecords = await fetchAirtableCoffeeStores(id);
    
    if (existingRecords.length > 0) {
        console.log("Coffee store already exists in Airtable");
        return existingRecords;
    }

    const storeData = {
        id: coffeeStore.id || "",
        index: coffeeStore.index || 0,
        name: coffeeStore.name || "not found",
        address: coffeeStore.address || "not found",
        imgUrl: coffeeStore.imgUrl || "not found",
        rating: coffeeStore.rating || 0,
        voting: coffeeStore.votes || 0,
    };

    const createResult = await coffeeStoresTable.create([
        { fields: storeData }
    ]);

    const minifiedResult = minifyRecord(createResult as AirtableRecordType[]);
    console.log("Created coffee store in Airtable:", minifiedResult);
    
    return minifiedResult;
};

export {
    base,
    coffeeStoresTable,
    minifyRecord,
    fetchAirtableCoffeeStores,
    createCoffeeStore,
    type AirtableRecordType
};