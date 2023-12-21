#!/usr/bin/env node

const fs = require('node:fs/promises');
const apiBase = "https://sammeltassen-oclcsearchapi.web.val.run/?oclcnumber="
const dlcsBase = "https://dlc.services/iiif-resource/7/string1string2string3/reuzenarbeid/"

async function fetchJson(url) {
    return fetch(url).then((response) => response.json())
}

const dlcsIds = [
    [ "TRG-9105-A-01", ["1378470126"] ],
    [ "TRG-9301-E-01", ["1237356170", "1243057076"] ],
    [ "TRG-9301-E-02", ["1237634525", "1243057061"] ],
    [ "TRG-9301-G-01", ["1237635605"] ],
    [ "TRG-9301-G-02", ["1237635783", "1243061051", "1243061106", "1243061159", "1243061955", "1243062003", "1243062013", "1243062023", "1243062483"] ],
    [ "TRG-9301-K-01", ["1299148289"] ],
    [ "TRG-9301-M-02", ["1237637525", "1243067185", "1243067193", "1243067220"] ],
    [ "TRG-9301-M-03", ["1378470890"] ],
    [ "TRG-9301-T-03", ["1378470871"] ],
    [ "TRG-9302-B-01", ["1237638879", "1243245380", "1243259706", "1243259713"] ],
    [ "TRG-9302-B-02", ["1237640454", "1243245556", "1243259317", "1243259673"] ],
    [ "TRG-9302-H-02", ["1237802155", "1243261300", "1243264161"] ],
    [ "TRG-9302-M-01", ["1237803161", "1237803643", "1243264632", "1243531664"] ],
    [ "TRK-9103-E-03", ["841362050"] ],
    [ "TRK-9103-M-04", ["1378469923"] ],
    [ "TRK-9105-A-02", ["841361496"] ],
    [ "TRK-9105-A-03", ["841362052"] ],
    [ "TRK-9105-A-04", ["841361499"] ],
    [ "TRK-9105-A-05", ["841362055"] ],
    [ "TRK-9105-T-01", ["841362054"] ],
    [ "TRK-9801-135", ["841723422"] ],
    [ "TRK-9806-129", ["842009241"] ]
]


// https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs

async function writeManifests() {
    for (let id of dlcsIds) {
        try {
            const manifest = await fetchJson(dlcsBase + id[0])
            const oclcnumer = id[1][0]
            const oclcresp = await fetchJson(apiBase + oclcnumer)
            console.log(oclcresp)
            Promise.all([])
            manifest.label = oclcresp.title.mainTitles[0].text
            await fs.writeFile(`reuzenarbeid/${id[0]}.json`, JSON.stringify(manifest, null, 2));
        } catch (err) {
            console.log(err);
        }
    }
}

writeManifests();