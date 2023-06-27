import {Client} from "@/interfaces/client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {AppState} from "./store";

export interface ClientListState {
    clients: Client[];
    searchedClients: Client[];
}

const initialState: ClientListState = {
    clients: [],
    searchedClients: [],
};

export const clientListSlice = createSlice({
    name: 'clientList',
    initialState,
    reducers: {
        setClientListState(state, action) {
            state.clients = action.payload;
            state.clients.map(e => e.otherReports = []);
            state.searchedClients = action.payload;
            state.searchedClients.map(e => e.otherReports = []);
        },
        addClient(state, action: PayloadAction<Client>) {
            const newClient = {
                id: action.payload.id,
                name: action.payload.name,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                website: action.payload.website,
                otherReports: []
            }
            state.clients.push(newClient);
            state.searchedClients.push(newClient);
        },
        removeClient(state, action: PayloadAction<number>) {
            state.clients = state.clients.filter((item) => item.id !== action.payload);
            state.searchedClients = state.clients.filter((item) => item.id !== action.payload);
        },
        addClientReport(state, action: PayloadAction<number>) {
            state.clients.find(item => item.id === action.payload)?.otherReports?.push({
                id: new Date().getTime(),
                data: [{id: new Date().getTime(), text: 'Some New Report'}],
            })
            state.searchedClients.find(item => item.id === action.payload)?.otherReports?.push({
                id: new Date().getTime(),
                data: [{id: new Date().getTime(), text: 'Some New Report'}],
            })

        },
        addClientReportData(state, action: PayloadAction<{clientId: number, otherReportId: number}>) {
            const item = state.clients.find((item) => item.id === action.payload.clientId)?.otherReports;
            const searchedItem = state.searchedClients.find((item) => item.id === action.payload.clientId)?.otherReports;

            item?.find((item) => item.id === action.payload.otherReportId).data.push({id: new Date().getTime(), text: 'new Data'})
            searchedItem?.find((item) => item.id === action.payload.otherReportId).data.push({id: new Date().getTime(), text: 'new Data'})
        },
        removeClientReport(state, action: PayloadAction<{clientId: number, prop: string}>) {
            const item = state.clients.find((item) => item.id === action.payload.clientId);
            const searchedItem = state.searchedClients.find((item) => item.id === action.payload.clientId);

            for (const prop in item) {
                if (prop === action.payload.prop as keyof Client)  {
                    delete item[prop]
                }
            }
            for (const prop in searchedItem ) {
                if (prop === action.payload.prop as keyof Client) {
                    delete searchedItem[prop]
                }
            }
        },
        removeClientOtherReport(state, action: PayloadAction<{clientId: number, otherReportId: number}>) {
            const item = state.clients.find((item) => item.id === action.payload.clientId)?.otherReports;
            const searchedItem = state.searchedClients.find((item) => item.id === action.payload.clientId)?.otherReports;


            item?.splice(item.findIndex((item) => item.id === action.payload.otherReportId), 1)
            searchedItem?.splice(searchedItem.findIndex((item) => item.id === action.payload.otherReportId), 1)
        },
        removeClientReportData(state, action: PayloadAction<{clientId: number, otherReportId: number, otherReportDataId: number}>) {
            const item = state.clients.find((item) => item.id === action.payload.clientId)?.otherReports
                ?.find((item) => item.id === action.payload.otherReportId).data;
            const searchedItem = state.searchedClients.find((item) => item.id === action.payload.clientId)?.otherReports
                ?.find((item) => item.id === action.payload.otherReportId).data;

            item?.splice(item.findIndex((item: {id: number, text: string}) => item.id === action.payload.otherReportDataId), 1)
            searchedItem?.splice(searchedItem.findIndex((item: {id: number, text: string}) => item.id === action.payload.otherReportDataId), 1)
        },
        searchClient(state, action: PayloadAction<string>) {
            state.searchedClients = state.clients.filter((client) => client.name && client.name.includes(action.payload));
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.clients,
            };
        },
    },
})

export const { setClientListState, addClient, removeClient, removeClientReport, removeClientOtherReport, removeClientReportData, searchClient, addClientReport, addClientReportData } = clientListSlice.actions;

export const selectClientsState = (state: AppState) => state.clientList.clients;
export const selectSearchedClientsState = (state: AppState) => state.clientList.searchedClients;

export default clientListSlice.reducer;

