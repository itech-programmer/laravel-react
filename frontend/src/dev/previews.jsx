import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NewDocumentForm from "../components/NewDocumentForm";
import DocumentsList from "../components/DocumentsList";
import DocumentView from "../components/DocumentView";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NewDocumentForm">
                <NewDocumentForm/>
            </ComponentPreview>
            <ComponentPreview path="/DocumentsList">
                <DocumentsList/>
            </ComponentPreview>
            <ComponentPreview path="/DocumentView">
                <DocumentView/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews