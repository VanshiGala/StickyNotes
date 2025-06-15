import React from "react";
import ReactDom from 'react-dom'

const SideNavPortal=({children})=>{
    const portalRoot = document.getElementById('navPortal')
    return ReactDom.createPortal(children , portalRoot);
}

export default SideNavPortal;