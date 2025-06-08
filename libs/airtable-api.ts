import { CoffeeShopType } from '@/types/coffee-store-types';
import Airtable, { Record, FieldSet } from 'airtable';

const base = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY }).base('appmKm3RahPdo3BW2');
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
            console.log("record found in airtable", findRecords);
        return minifyRecord(findRecords as AirtableRecordType[]);
    } catch (error) {
        console.error("Error fetching from Airtable:", error);
        return [];
    }
};

const createCoffeeStore = async (name: string, address: string, rating: number, imgUrl: string, voteCount: number, id: string, index: number) => {
    const existingRecords = await fetchAirtableCoffeeStores(id);
    
    if (existingRecords.length > 0) {
        console.log("Coffee store already exists in Airtable");
        return existingRecords;
    }

    const storeData = {
        id: id || "",
        index: index || 0,
        name: name || "not found",
        address: address || "not found",
        imgUrl: imgUrl || "not found",
        rating: rating || 0,
        voting: voteCount || 0,
    };

    const createResult = await coffeeStoresTable.create([
        { fields: storeData }
    ]);

    const minifiedResult = minifyRecord(createResult as AirtableRecordType[]);
    console.log("Created coffee store in Airtable:", minifiedResult);
    
    return minifiedResult;
};
const updateCoffeeStoreVotes = async (vote: number, recordId: string, id: string) => {
    try {
        const existingRecords = await fetchAirtableCoffeeStores(id);
        if (existingRecords.length > 0) {
            const updateResult = await coffeeStoresTable.update([
                {
                    id: recordId,
                    fields: { voting: vote }
                }
            ]);
            console.log("Successfully updated vote count in Airtable:", updateResult);
            return updateResult;
        }
        return null;
    } catch (error) {
        console.error("Error updating vote count:", error);
        return null;
    }
};
export {
    base,
    coffeeStoresTable,
    minifyRecord,
    fetchAirtableCoffeeStores,
    createCoffeeStore,
    updateCoffeeStoreVotes,
    type AirtableRecordType
};