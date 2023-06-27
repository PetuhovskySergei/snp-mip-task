import {Accordion} from "@/components/accordion/accordion";
import {useEffect} from "react";
import getClientList from "@/pages/api/get-client-list";
import {NextPage} from "next";
import {useDispatch, useSelector} from "react-redux";
import {
    addClientReport, addClientReportData,
    removeClient, removeClientOtherReport, removeClientReport, removeClientReportData,
    selectSearchedClientsState,
    setClientListState
} from "@/store/client-list-slice";
import ClientListHeader from "@/features/client-list/client-list-header";

import styles from './client-list.module.scss';

const ClientList: NextPage = () => {
    const searchedClientListState = useSelector(selectSearchedClientsState);
    const dispatch = useDispatch();

    const removeClientItem = (id: number) => {
        dispatch(removeClient(id))
    }

    const removeReportItem = (clientId: number, prop: string) => {
        dispatch(removeClientReport({clientId, prop}))
    }

    const removeOtherReportItem = (clientId: number, otherReportId: number) => {
        dispatch(removeClientOtherReport({clientId, otherReportId}))
    }

    const removeOtherReportDataItem = (clientId: number, otherReportId: number, otherReportDataId: number) => {
        dispatch(removeClientReportData({clientId, otherReportId, otherReportDataId}))
    }

    const addReport = (id: number) => {
        dispatch(addClientReport(id))
    }

    const addReportData = (clientId: number, otherReportId: number) => {
        dispatch(addClientReportData({clientId, otherReportId}))
    }

    useEffect(() => {
        getClientList().then(users => dispatch(setClientListState(users)))
    }, [dispatch])

    return (
        <>
            <ClientListHeader />
            {searchedClientListState.length ? (
                <Accordion
                    onRemoveClient={removeClientItem}
                    onRemoveReport={removeReportItem}
                    onRemoveOtherReport={removeOtherReportItem}
                    onRemoveReportData={removeOtherReportDataItem}
                    onAddReport={addReport}
                    onAddReportData={addReportData}
                    containerStyle={styles.accordion}
                    items={searchedClientListState}
                />
            ) : (
                <div className={styles.noFound}>No Clients found</div>
            )}

        </>
    )
}

export default ClientList;
