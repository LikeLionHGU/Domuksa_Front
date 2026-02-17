//룸에 있는 안건에 있는 파일 불러오기+ 확대
import { useState, useEffect } from "react";
import style from "../CSS/File.module.css";

import axios from "axios";
// import { PDFViewer } from '@embedpdf/react-pdf-viewer';
import fileIcon from "../asset/icon-filelist.png";

function File({ onChange, clickedAgendaId }) {

    const token = localStorage.getItem("accessToken");
    const [listModal, setListModal] = useState(false);
    const [Files, setFiles] = useState([]);
    const [FileChosenUrl, setFileChosenUrl] = useState(null);
    const [isPdf,setIsPdf]=useState();
    useEffect(() => {
        console.log(window.crossOriginIsolated);
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/file/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data);
                    setFiles(res.data);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [])
    function addNewfile(e) {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        axios.post(
            `${process.env.REACT_APP_HOST_URL}/file/${clickedAgendaId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                    // Content-Type 굳이 안 써도 됨
                }
            }
        )
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    setFiles(prev => [...prev, res.data]);
                }
            })
            .catch(error => {
                console.error("파일 업로드 실패:", error);
            });
    }
    function HandleChoise(file) {
        setIsPdf(file.isPdf);
        setFileChosenUrl(file.fileUrl);
    }
    function DeleteFile(e) {
        console.log(e.target);
        const DeleteTarget = e.target.id;
        axios.delete(`${process.env.REACT_APP_HOST_URL}/file/${DeleteTarget}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    setFiles(prev => prev.filter(file => file.id !== DeleteTarget));
                }
            })
            .catch(error => {
                console.error("파일 업로드 실패:", error);
            });
    }
    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>파일</h3>
                <h2 onClick={() => onChange("basic")} >+</h2>
            </div>
            <div className={style.Viewer}>
                {/* <PDFViewer
                    config={{ src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }}
                    style={{ width: "100%", height: "100%" }}
                    onReady={(registry) => {
                        console.log('PDF viewer ready!', registry);
                    }}
                /> */}
                {isPdf ? <iframe
                    src={FileChosenUrl}
                    width="100%"
                    height="100%"

                />
                    : <img src={FileChosenUrl}/>
                }
                {listModal && <div className={style.Filelist} onMouseLeave={() => setListModal(false)}>
                    <input
                        style={{ display: "none" }}
                        id="Newfile"
                        type="file"
                        onChange={(e) => addNewfile(e)}
                    />
                    <label htmlFor="Newfile">
                        <div className={style.Createbox}>+</div>
                    </label>
                    {Files.map((file) => {
                        return (
                            <div id={file.id} key={file.id} className={style.box} onClick={(e) => {
                                HandleChoise(file)
                            }}>
                                <img id={file.id} src={file.fileUrl} />
                                <div id={file.id} className={style.Close} onClick={(e) => {
                                    e.stopPropagation();
                                    DeleteFile(e)
                                }}
                                ><h1 id={file.id}>+</h1></div>
                            </div>

                        );
                    })}
                </div>}

                <div className={style.Iconbox}><img alt="listicon" className={style.ListIcon} src={fileIcon} onMouseEnter={() => setListModal(true)} /></div>
            </div>
        </div >
    );
}
export default File;
