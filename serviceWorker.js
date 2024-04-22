const filesToCache = [
    "map.html",
    "libs/p5.min.js",
    "libs/p5.camera.js",
    "libs/jszip.min.js",
    "engine/utils.js",
    "engine/engine.js",
    "engine/collision/p5.collide.js",
    "engine/collision/handler.js",
    "engine/objects/collision.js",
		"engine/objects/torus.js",
		"engine/objects/cone.js",
		"engine/objects/cylinder.js",
		"engine/objects/material.js",
    "engine/components/component.js",
    "engine/components/scriptComponent.js",
    "engine/objects/object.js",
    "engine/objects/box.js",
    "engine/objects/player.js",
    "engine/objects/end.js",
    "engine/objects/text.js",
    "engine/objects/enemyBox.js",
    "engine/objects/interactive.js",
    "engine/objects/bullet.js",
    "engine/objects/movingPlatform.js",
    "engine/editor/contentBrowser.js",
    "engine/editor/editorFuncs.js",
    "loader/level.js",
    "loader/support.js",
    "map.js",
    "libs/defaultFont.ttf",
    "libs/shoelace/cdn/shoelace.js",
    "libs/rapier2d.js",
    "libs/shoelace/cdn/chunks/chunk.ULMIBG4O.js",
    "libs/shoelace/cdn/chunks/chunk.HAL7R4WT.js",
    "libs/shoelace/cdn/chunks/chunk.QL5C2XOW.js",
    "libs/shoelace/cdn/chunks/chunk.A2HNSG6C.js",
    "libs/shoelace/cdn/chunks/chunk.INXRRMTG.js",
    "libs/shoelace/cdn/chunks/chunk.YSNH6KXF.js",
    "libs/shoelace/cdn/chunks/chunk.3WN56RFF.js",
    "libs/shoelace/cdn/chunks/chunk.JZJ4JVL5.js",
    "libs/shoelace/cdn/chunks/chunk.TQHSXLWO.js",
    "libs/shoelace/cdn/chunks/chunk.6U7YXO2I.js",
    "libs/shoelace/cdn/chunks/chunk.TXR64GS7.js",
    "libs/shoelace/cdn/chunks/chunk.QJAGEEX6.js",
    "libs/shoelace/cdn/chunks/chunk.K3Y2CPPK.js",
    "libs/shoelace/cdn/chunks/chunk.6QXCTQ6O.js",
    "libs/shoelace/cdn/chunks/chunk.COGGKAIW.js",
    "libs/shoelace/cdn/chunks/chunk.KO2GJ6K7.js",
    "libs/shoelace/cdn/chunks/chunk.DUJXQQTL.js",
    "libs/shoelace/cdn/chunks/chunk.VGJFRRGP.js",
    "libs/shoelace/cdn/chunks/chunk.N2KN3ITW.js",
    "libs/shoelace/cdn/chunks/chunk.O7ORY4XC.js",
    "libs/shoelace/cdn/chunks/chunk.YNEEHQ76.js",
    "libs/shoelace/cdn/chunks/chunk.COOYOPEH.js",
    "libs/shoelace/cdn/chunks/chunk.44WN3FPW.js",
    "libs/shoelace/cdn/chunks/chunk.CTLRNP32.js",
    "libs/shoelace/cdn/chunks/chunk.BBE5FAVY.js",
    "libs/shoelace/cdn/chunks/chunk.FKCRZNPU.js",
    "libs/shoelace/cdn/chunks/chunk.LL7JZL4H.js",
    "libs/shoelace/cdn/chunks/chunk.G74GH4Z7.js",
    "libs/shoelace/cdn/chunks/chunk.ICX3CO6G.js",
    "libs/shoelace/cdn/chunks/chunk.IWITRU34.js",
    "libs/shoelace/cdn/chunks/chunk.BEOOW4CA.js",
    "libs/shoelace/cdn/chunks/chunk.ODOEMKE7.js",
    "libs/shoelace/cdn/chunks/chunk.UX5YA2PF.js",
    "libs/shoelace/cdn/chunks/chunk.JCVQJTJ2.js",
    "libs/shoelace/cdn/chunks/chunk.5OHOXFON.js",
    "libs/shoelace/cdn/chunks/chunk.X6DUCTHD.js",
    "libs/shoelace/cdn/chunks/chunk.RG2US5IE.js",
    "libs/shoelace/cdn/chunks/chunk.SE5MO7C4.js",
    "libs/shoelace/cdn/chunks/chunk.W5NS462A.js",
    "libs/shoelace/cdn/chunks/chunk.446EZHZP.js",
    "libs/shoelace/cdn/chunks/chunk.IPXZPQL5.js",
    "libs/shoelace/cdn/chunks/chunk.5CSXQOKV.js",
    "libs/shoelace/cdn/chunks/chunk.3SNIH4MP.js",
    "libs/shoelace/cdn/chunks/chunk.VN7JQE5R.js",
    "libs/shoelace/cdn/chunks/chunk.CR6ENTQL.js",
    "libs/shoelace/cdn/chunks/chunk.BKHUKWJ6.js",
    "libs/shoelace/cdn/chunks/chunk.NJJA5ODV.js",
    "libs/shoelace/cdn/chunks/chunk.KRQIAZSR.js",
    "libs/shoelace/cdn/chunks/chunk.ITNMWV5O.js",
    "libs/shoelace/cdn/chunks/chunk.TJDTHPOE.js",
    "libs/shoelace/cdn/chunks/chunk.UG7YZ3TN.js",
    "libs/shoelace/cdn/chunks/chunk.OLXO3P7C.js",
    "libs/shoelace/cdn/chunks/chunk.DVBXZ77H.js",
    "libs/shoelace/cdn/chunks/chunk.6TBKMYFU.js",
    "libs/shoelace/cdn/chunks/chunk.3GMETAQA.js",
    "libs/shoelace/cdn/chunks/chunk.NKQ6F5BR.js",
    "libs/shoelace/cdn/chunks/chunk.ZARPEYIV.js",
    "libs/shoelace/cdn/chunks/chunk.PDG7QIZ2.js",
    "libs/shoelace/cdn/chunks/chunk.5HTUELX3.js",
    "libs/shoelace/cdn/chunks/chunk.U57C32JB.js",
    "libs/shoelace/cdn/chunks/chunk.NIMBIL2G.js",
    "libs/shoelace/cdn/chunks/chunk.V24MNKXI.js",
    "libs/shoelace/cdn/chunks/chunk.S727AJAG.js",
    "libs/shoelace/cdn/chunks/chunk.XA2FJXGQ.js",
    "libs/shoelace/cdn/chunks/chunk.QKHOWDSI.js",
    "libs/shoelace/cdn/chunks/chunk.FQXWNSAM.js",
    "libs/shoelace/cdn/chunks/chunk.TWRQNFRE.js",
    "libs/shoelace/cdn/chunks/chunk.QUKXBKMR.js",
    "libs/shoelace/cdn/chunks/chunk.DX4UYOJN.js",
    "libs/shoelace/cdn/chunks/chunk.DAINRGQE.js",
    "libs/shoelace/cdn/chunks/chunk.IK7B3ZDO.js",
    "libs/shoelace/cdn/chunks/chunk.HFX7VRA3.js",
    "libs/shoelace/cdn/chunks/chunk.Y7TREFFK.js",
    "libs/shoelace/cdn/chunks/chunk.V7G2BEYY.js",
    "libs/shoelace/cdn/chunks/chunk.LHXA4CY4.js",
    "libs/shoelace/cdn/chunks/chunk.TVIKNRDE.js",
    "libs/shoelace/cdn/chunks/chunk.Q6TFRPQT.js",
    "libs/shoelace/cdn/chunks/chunk.527PKT63.js",
    "libs/shoelace/cdn/chunks/chunk.E5OM55FN.js",
    "libs/shoelace/cdn/chunks/chunk.PYZD6E2O.js",
    "libs/shoelace/cdn/chunks/chunk.Y3VCYBD4.js",
    "libs/shoelace/cdn/chunks/chunk.345GMLJC.js",
    "libs/shoelace/cdn/chunks/chunk.FCS6RI2H.js",
    "libs/shoelace/cdn/chunks/chunk.R25LA2E4.js",
    "libs/shoelace/cdn/chunks/chunk.N6PG6LMQ.js",
    "libs/shoelace/cdn/chunks/chunk.ILHZEZGT.js",
    "libs/shoelace/cdn/chunks/chunk.MKFCW46J.js",
    "libs/shoelace/cdn/chunks/chunk.Y5FUDBT5.js",
    "libs/shoelace/cdn/chunks/chunk.MEB6XD75.js",
    "libs/shoelace/cdn/chunks/chunk.HNY7YLPC.js",
    "libs/shoelace/cdn/chunks/chunk.3QIFLSHM.js",
    "libs/shoelace/cdn/chunks/chunk.IYPGOOEF.js",
    "libs/shoelace/cdn/chunks/chunk.EFP5USK5.js",
    "libs/shoelace/cdn/chunks/chunk.XNEONNEJ.js",
    "libs/shoelace/cdn/chunks/chunk.I4WYIMHG.js",
    "libs/shoelace/cdn/chunks/chunk.5ODI3JJ2.js",
    "libs/shoelace/cdn/chunks/chunk.OZN2G3SO.js",
    "libs/shoelace/cdn/chunks/chunk.4YLXYI7T.js",
    "libs/shoelace/cdn/chunks/chunk.SJ2EERJR.js",
    "libs/shoelace/cdn/chunks/chunk.ABXSFS6K.js",
    "libs/shoelace/cdn/chunks/chunk.4JTT5X2V.js",
    "libs/shoelace/cdn/chunks/chunk.PS4KRVWV.js",
    "libs/shoelace/cdn/chunks/chunk.4NHPA75Z.js",
    "libs/shoelace/cdn/chunks/chunk.CV4IKXMT.js",
    "libs/shoelace/cdn/chunks/chunk.U2D46ZMA.js",
    "libs/shoelace/cdn/chunks/chunk.L27452FD.js",
    "libs/shoelace/cdn/chunks/chunk.5ORLI3IP.js",
    "libs/shoelace/cdn/chunks/chunk.LLHARA6N.js",
    "libs/shoelace/cdn/chunks/chunk.S5RN7AXR.js",
    "libs/shoelace/cdn/chunks/chunk.STN4D5RQ.js",
    "libs/shoelace/cdn/chunks/chunk.D72QKQKE.js",
    "libs/shoelace/cdn/chunks/chunk.WB6PZ3X4.js",
    "libs/shoelace/cdn/chunks/chunk.67HE6XBT.js",
    "libs/shoelace/cdn/chunks/chunk.ES4D3SHG.js",
    "libs/shoelace/cdn/chunks/chunk.SIUQ4VWC.js",
    "libs/shoelace/cdn/chunks/chunk.JWKDOUFU.js",
    "libs/shoelace/cdn/chunks/chunk.RK73WSZS.js",
    "libs/shoelace/cdn/chunks/chunk.MQMD74KM.js",
    "libs/shoelace/cdn/chunks/chunk.EZM3EH2V.js",
    "libs/shoelace/cdn/chunks/chunk.GY4SXHHG.js",
    "libs/shoelace/cdn/chunks/chunk.MFYALPIB.js",
    "libs/shoelace/cdn/chunks/chunk.R63PE6KG.js",
    "libs/shoelace/cdn/chunks/chunk.F5TX5A2C.js",
    "libs/shoelace/cdn/chunks/chunk.YEAYVUQW.js",
    "libs/shoelace/cdn/chunks/chunk.DLZGXMOX.js",
    "libs/shoelace/cdn/chunks/chunk.CWG7NIPY.js",
    "libs/shoelace/cdn/chunks/chunk.A4SOQOK5.js",
    "libs/shoelace/cdn/chunks/chunk.7NMJA26P.js",
    "libs/shoelace/cdn/chunks/chunk.PG2YQQKG.js",
    "libs/shoelace/cdn/chunks/chunk.ZJUZODNS.js",
    "libs/shoelace/cdn/chunks/chunk.G75TI7GH.js",
    "libs/shoelace/cdn/chunks/chunk.XW6MQ4IO.js",
    "libs/shoelace/cdn/chunks/chunk.YG4KADHM.js",
    "libs/shoelace/cdn/chunks/chunk.AVUR72XK.js",
    "libs/shoelace/cdn/chunks/chunk.7X5TLJCX.js",
    "libs/shoelace/cdn/chunks/chunk.QZ7LRVH3.js",
    "libs/shoelace/cdn/chunks/chunk.NHZ7JO7Z.js",
    "libs/shoelace/cdn/chunks/chunk.7KCYHPAQ.js",
    "libs/shoelace/cdn/chunks/chunk.4PTVBDCO.js",
    "libs/shoelace/cdn/chunks/chunk.DSSXN3AW.js",
    "libs/shoelace/cdn/chunks/chunk.33VIDLUC.js",
    "libs/shoelace/cdn/chunks/chunk.YMMUHRCC.js",
    "libs/shoelace/cdn/chunks/chunk.SWYANKQ5.js",
    "libs/shoelace/cdn/chunks/chunk.MGAW64L2.js",
    "libs/shoelace/cdn/chunks/chunk.ZD732334.js",
    "libs/shoelace/cdn/chunks/chunk.RXGBPVOV.js",
    "libs/shoelace/cdn/chunks/chunk.GKH4LBJE.js",
    "libs/shoelace/cdn/chunks/chunk.HF7GESMZ.js",
    "libs/shoelace/cdn/chunks/chunk.F4VGSDIW.js",
    "libs/shoelace/cdn/chunks/chunk.5GTHNDUL.js",
    "libs/shoelace/cdn/chunks/chunk.FAJNDBJP.js",
    "libs/shoelace/cdn/chunks/chunk.NFP5WPQO.js",
    "libs/shoelace/cdn/chunks/chunk.6TJJYPNU.js",
    "libs/shoelace/cdn/chunks/chunk.CLSYOJXW.js",
    "libs/shoelace/cdn/chunks/chunk.XZTAEOEM.js",
    "libs/shoelace/cdn/chunks/chunk.WVTD7WWK.js",
    "libs/shoelace/cdn/chunks/chunk.SFOXW5U7.js",
    "libs/shoelace/cdn/chunks/chunk.IDSDMMR3.js",
    "libs/shoelace/cdn/chunks/chunk.2JJAKBT3.js",
    "libs/shoelace/cdn/chunks/chunk.JKMZKI5D.js",
    "libs/shoelace/cdn/chunks/chunk.XDZKIXQF.js",
    "libs/shoelace/cdn/chunks/chunk.JDK53XHA.js",
    "libs/shoelace/cdn/chunks/chunk.5J6GS3A3.js",
    "libs/shoelace/cdn/chunks/chunk.SIRID5O6.js",
    "libs/shoelace/cdn/chunks/chunk.YRXRCFKA.js",
    "libs/shoelace/cdn/chunks/chunk.5PZGQVNG.js",
    "libs/shoelace/cdn/chunks/chunk.OCAFZ6SL.js",
    "libs/shoelace/cdn/chunks/chunk.JTXRDB7E.js",
    "libs/shoelace/cdn/chunks/chunk.NZI26M5M.js",
    "libs/shoelace/cdn/chunks/chunk.GHSUO25V.js",
    "libs/shoelace/cdn/chunks/chunk.PGGKA6NK.js",
    "libs/shoelace/cdn/chunks/chunk.E4AJYFRU.js",
    "libs/shoelace/cdn/chunks/chunk.DZOSR3QC.js",
    "libs/shoelace/cdn/chunks/chunk.3R4LTGQO.js",
    "libs/shoelace/cdn/chunks/chunk.AXPFFMX2.js",
    "libs/shoelace/cdn/chunks/chunk.OJXC6SIV.js",
    "libs/shoelace/cdn/chunks/chunk.SVR3BCBR.js",
    "libs/shoelace/cdn/chunks/chunk.7DF2XMEC.js",
    "libs/shoelace/cdn/chunks/chunk.E32NGA3R.js",
    "libs/shoelace/cdn/chunks/chunk.M4T5SJDM.js",
    "libs/shoelace/cdn/chunks/chunk.NQJBQYMU.js",
    "libs/shoelace/cdn/chunks/chunk.KBTQCERC.js",
    "libs/shoelace/cdn/chunks/chunk.3RKKOOOS.js",
    "libs/shoelace/cdn/chunks/chunk.G7NTSM66.js",
    "libs/shoelace/cdn/chunks/chunk.OAQT3AUQ.js",
    "libs/shoelace/cdn/chunks/chunk.B4BZKR24.js",
    "libs/shoelace/cdn/chunks/chunk.65AZ2BGN.js",
    "libs/shoelace/cdn/chunks/chunk.WQ47NP54.js",
    "libs/shoelace/cdn/chunks/chunk.LZA5Z3YQ.js",
    "libs/shoelace/cdn/chunks/chunk.UP2KMO5A.js",
    "libs/shoelace/cdn/chunks/chunk.3BGJFSZ6.js",
    "libs/shoelace/cdn/chunks/chunk.NYIIDP5N.js",
    "libs/shoelace/cdn/chunks/chunk.F3GQIC3Z.js",
    "libs/shoelace/cdn/chunks/chunk.UP75L23G.js",
    "libs/shoelace/cdn/chunks/chunk.JUWARVXJ.js",
    "libs/shoelace/cdn/chunks/chunk.7WDKMTEU.js",
    "libs/shoelace/cdn/chunks/chunk.N4HXU5HH.js",
    "libs/shoelace/cdn/chunks/chunk.HAUXDFZJ.js",
    "libs/shoelace/cdn/chunks/chunk.4IWHTOGY.js",
    "libs/shoelace/cdn/chunks/chunk.3WAW4E2K.js",
    "libs/shoelace/cdn/chunks/chunk.P7ZG6EMR.js",
    "libs/shoelace/cdn/chunks/chunk.VRTJZYIC.js",
    "libs/shoelace/cdn/chunks/chunk.GSTABTN3.js",
    "libs/shoelace/cdn/chunks/chunk.VQ3XOPCT.js",
    "libs/shoelace/cdn/chunks/chunk.OEOITZKB.js",
    "libs/shoelace/cdn/chunks/chunk.3Y6SB6QS.js",
    "libs/shoelace/cdn/chunks/chunk.GZDQBK6W.js",
    "libs/shoelace/cdn/chunks/chunk.FQG5QBCI.js",
    "libs/shoelace/cdn/chunks/chunk.CYORH2MW.js",
    "libs/shoelace/cdn/chunks/chunk.LKA3TPUC.js",
    "libs/shoelace/cdn/assets/icons/plus-circle.svg",
    "libs/shoelace/cdn/assets/icons/repeat-1.svg",
    "libs/shoelace/cdn/assets/icons/save.svg",
    "libs/shoelace/cdn/assets/icons/file-earmark-zip.svg",
    "libs/shoelace/cdn/assets/icons/play.svg",
    "libs/shoelace/cdn/assets/icons/arrow-clockwise.svg",
    "examples/platformer.json",
    "engine/objects/collisionChecker.js",
    "manifest.json",
    "android-chrome-192x192.png"
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if(navigator.onLine) {
                    return fetch(event.request);
                }
                return response;
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
