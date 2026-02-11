//룸에 있는 안건에 있는 파일 불러오기+ 확대

import style from "../CSS/File.module.css";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';

import fileIcon from "../asset/icon-filelist.png";

function File({ onChange }) {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>파일</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>
            <div className={style.Viewer}>
                <PDFViewer
                    config={{ src: "/1.pdf" }}
                    style={{ width: "100%", height: "100%" }}
                    onReady={(registry) => {
                        console.log('PDF viewer ready!', registry);
                    }}
                />
                <div className={style.Filelist}>
                    <div className={style.Iconbox}><img className={style.ListIcon} src={fileIcon} /></div>
                    <div className={style.Createbox}>+</div>
                    <div className={style.box}></div>
                    <div className={style.box}></div>
                </div>
            </div>
        </div >
    );
}
export default File;
