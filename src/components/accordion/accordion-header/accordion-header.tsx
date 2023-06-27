import {Accordion as AccordionBS, Button} from "react-bootstrap";

import styles from './accordion-header.module.scss';

interface AccordionHeaderProps {
    itemName?: string,
    onRemove: () => void,
}

const AccordionHeader = ({itemName, onRemove}: AccordionHeaderProps) => {
    return (
        <AccordionBS.Header className={styles.header}>
            {itemName}
            <Button variant='danger' onClick={onRemove} className={styles.remove}>
                X
            </Button>
        </AccordionBS.Header>
    )
}

export default AccordionHeader;
