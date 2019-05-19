import React, { useState } from "react";
import Page from "~/layouts/page";
import ArtGallery from "~/components/ArtGallery"
import fetch from "cross-fetch";


const [pieces, setPieces] = useState([]);

const Gallery = () => {
    return (
        <Page>
            <ArtGallery />
        </Page>
    )
};

Gallery.getInitialProps = async ({ pathname, req }) => {
    const category = pathname.replace("/gallery", "");
    if (category !== "") {
        const res = await fetch(`http://localhost:3000/api/gallery/${category}`);
        console.log(res);
        return { res }
    }

    return {};
}

export default Gallery;
