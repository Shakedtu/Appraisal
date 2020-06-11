import React, {FunctionComponent} from 'react';
import CaseMenu from "./CaseMenu/CaseMenu";
import ContactInfo from "./ContactInfo/ContactInfo";

const Case: FunctionComponent = () => {
    return (
        <>
            <CaseMenu />
            <ContactInfo />
        </>
    )
}

export default Case;