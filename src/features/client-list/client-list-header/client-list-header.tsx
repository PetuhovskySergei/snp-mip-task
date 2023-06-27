import {Button, Form, InputGroup} from "react-bootstrap";
import {addClient, searchClient} from "@/store/client-list-slice";
import {useDispatch} from "react-redux";
import {generateString} from "@/utils/generate-string";

import styles from './client-list-header.module.scss';
import {useState} from "react";

export const ClientListHeader = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useDispatch();

    const dispatchAddClient = () => {
        dispatch(addClient({
            id: new Date().getTime(),
            name: generateString(),
            username: generateString(),
            email: generateString(),
            phone: generateString(),
            website: generateString(),
        }))
    }

    const dispatchSearchClient = () => {
        dispatch(searchClient(searchValue))
    }

    return (
        <header className={styles.header}>
            <Button onClick={dispatchAddClient}>New client</Button>
            <InputGroup className={styles.search}>
                <Form.Control
                    placeholder="Client search"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <Button variant="outline-secondary" onClick={dispatchSearchClient}>
                    Search
                </Button>
            </InputGroup>
        </header>
    )
}

export default ClientListHeader;
