//룸에 있는 안건에 있는 파일 불러오기+ 확대

import style from "../CSS/File.module.css";
import { useEffect, useRef, useState } from "react";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';
import dlt from "../asset/icon-delete.png";

function File({onChange}) {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>파일</h3>
                <img src={dlt} onClick={() => onChange("basic")} />
            </div>
            <div className={style.Viewer}>
                <PDFViewer
                    config={{ src: "/1.pdf" }}
                    style={{ width: "100%", height: "100%" }}
                    onReady={(registry) => {
                        console.log('PDF viewer ready!', registry);
                    }}
                />
            </div>
        </div >
    );
}
export default File;
