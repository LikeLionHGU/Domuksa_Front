//룸에 있는 안건에 있는 파일 불러오기+ 확대

import style from "../CSS/File.module.css";
import { useEffect, useRef, useState } from "react";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';

function File() {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>파일</h3>
            </div>
            <div className={style.Viewer}>
                <PDFViewer
                    config={{ src: "../asset/test.pdf" }}
                    style={{ height: '612px'}}
                    onReady={(registry) => {
                        console.log('PDF viewer ready!', registry);
                    }}
                />
            </div>
        </div >
    );
}
export default File;
