import {Accordion as AccordionBS, Button} from "react-bootstrap";
import {Client} from "@/interfaces/client";
import styles from './accordion.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccordionHeader from "./accordion-header";
import AccordionBody from "./accordion-body";

interface AccordionProps {
    items: Client[],
    onRemoveClient: (id: number) => void;
    onRemoveReport: (id: number, prop: string) => void;
    onRemoveOtherReport: (clientId: number, otherReportId: number) => void;
    onAddReport: (id: number) => void;
    onAddReportData: (clientId: number, otherReportId: number) => void;
    onRemoveReportData: (clientId: number, otherReportId: number, otherReportDataId: number) => void;
    containerStyle?: string,
}

export const Accordion = ({items, containerStyle, onRemoveClient, onRemoveReport, onRemoveOtherReport, onAddReport, onAddReportData, onRemoveReportData}: AccordionProps) => {
    return(
        <AccordionBS className={containerStyle}>
            {items.map((item) => {
                return (
                    <AccordionBS.Item key={item.id} eventKey={item.id.toString()}>
                        <AccordionHeader itemName={item?.name} onRemove={() => onRemoveClient(item.id)} />
                        <AccordionBody itemTitle={`${item.name} reports`} onAdd={() => onAddReport(item.id)} additionalComponent={
                            <AccordionBS>
                                {item.username && (
                                    <AccordionBS.Item eventKey={item.username}>
                                        <AccordionHeader itemName='Username' onRemove={() => onRemoveReport(item.id, 'username')} />
                                        <AccordionBody itemTitle={item.username} />
                                    </AccordionBS.Item>
                                )}
                                {item.email && (
                                    <AccordionBS.Item eventKey={item.email}>
                                        <AccordionHeader itemName='Email' onRemove={() => onRemoveReport(item.id, 'email')} />
                                        <AccordionBody itemTitle={item.email} />
                                    </AccordionBS.Item>
                                )}
                                {item.phone && (
                                    <AccordionBS.Item eventKey={item.phone}>
                                        <AccordionHeader itemName='Phone' onRemove={() => onRemoveReport(item.id, 'phone')} />
                                        <AccordionBody itemTitle={item.phone} />
                                    </AccordionBS.Item>
                                )}
                                {item.website && (
                                    <AccordionBS.Item eventKey={item.website}>
                                        <AccordionHeader itemName='Website' onRemove={() => onRemoveReport(item.id, 'website')} />
                                        <AccordionBody itemTitle={item.website} />
                                    </AccordionBS.Item>
                                )}
                                {item.otherReports && (
                                    item.otherReports.map((otherReportItem, index) => (
                                        <AccordionBS.Item key={otherReportItem.id} eventKey={`${otherReportItem.id}_${index}`}>
                                            <AccordionHeader itemName='Other report' onRemove={() => onRemoveOtherReport(item.id, otherReportItem.id)} />
                                            <AccordionBody itemTitle={'Report Data'} onAdd={() => onAddReportData(item.id, otherReportItem.id)} additionalComponent={
                                                otherReportItem.data.map((e: {id: number, text: string}) => (
                                                    <div key={e.id} className={styles.reports}>
                                                        {e.text}
                                                        <Button variant='danger' onClick={() => onRemoveReportData(item.id, otherReportItem.id, e.id)} className={styles.remove}>
                                                            X
                                                        </Button>
                                                    </div>
                                                ))
                                            } />
                                        </AccordionBS.Item>
                                    ))
                                )}
                            </AccordionBS>
                        } />
                    </AccordionBS.Item>
                )
            })}
        </AccordionBS>
    )
}
