import {Accordion as AccordionBS, Button} from "react-bootstrap";
import styles from "./accordion-body.module.scss";
import {ReactNode} from "react";

interface AccordionBodyProps {
    itemTitle?: string,
    onAdd?: () => void,
    additionalComponent?: ReactNode,
}

const AccordionBody = ({itemTitle = '', onAdd, additionalComponent}: AccordionBodyProps) => {
    return (
        <AccordionBS.Body>
            <div className={styles.bodyHeader}>
                {itemTitle}
                {onAdd && (
                    <Button onClick={onAdd}>Add report</Button>
                )}
            </div>
            {additionalComponent}
        </AccordionBS.Body>
    )
}

export default AccordionBody;
