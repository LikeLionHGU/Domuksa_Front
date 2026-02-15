//룸에 있는 안건에 있는 파일 불러오기+ 확대
import { useState, useEffect } from "react";
import style from "../CSS/File.module.css";
import { PDFViewer } from '@embedpdf/react-pdf-viewer';
import axios from "axios";

import fileIcon from "../asset/icon-filelist.png";
import pdf from "../asset/icon-pdf.png";

function File({ onChange, clickedAgendaId }) {

    const token = localStorage.getItem("accessToken");
    const [listModal, setListModal] = useState(false);
    const [Files, setFiles] = useState([]);
    useEffect(() => {

        //data.reverse() 뒤집기
    }, [])
    function addNewfile(e) {
        // e.target.files

        axios
            .post(`${process.env.REACT_APP_HOST_URL}/file/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                file: e.target.files,
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setFiles(prev => [...prev, res.data]);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }
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
                {listModal && <div className={style.Filelist} onMouseLeave={() => setListModal(false)}>
                    <input
                        style={{ display: "none" }}
                        id="Newfile"
                        type="file"
                        onChange={(e) => addNewfile(e)}
                    />
                    <label htmlFor="Newfile">
                        <div className={style.Createbox} onClick={() => addNewfile()}>+</div>
                    </label>
                    {Files.map((file) => {
                        return (
                            <div className={style.box}>
                                {file.fileType === "img" ? <img src={file.fileUrl} /> : <img src={pdf} />}
                            </div>
                        );
                    })}

                    <div className={style.box}>
                        <img src={pdf} />
                    </div>
                </div>}

                <div className={style.Iconbox}><img alt="listicon" className={style.ListIcon} src={fileIcon} onMouseEnter={() => setListModal(true)} /></div>
            </div>
        </div >
    );
}
export default File;
