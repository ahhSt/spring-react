import React, { createContext, useState } from 'react';

export const TermContext = createContext({});

export const TermProvider = (props) => {
    const {children} = props;

    const [words, concatWords] = useState([]);
    const [domain, selectDomain] = useState({});
    const [reload, setReload] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState({});
    const [selectTermIdx, setSelectTermIdx] = useState([]);

    const saveCallback = () => {
        let toggle = reload === 1 ? 0 : 1;
        setReload((value) => toggle);
    }
    
    const contextValue = {
        words, concatWords, 
        domain, selectDomain, 
        saveCallback, 
        reload, setReload,
        selectedTerm, setSelectedTerm,
        selectTermIdx, setSelectTermIdx
    };
    
    return (
        <TermContext.Provider value={contextValue}>
            {children}
        </TermContext.Provider>
    );
};