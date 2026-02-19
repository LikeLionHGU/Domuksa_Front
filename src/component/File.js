//룸에 있는 안건에 있는 파일 불러오기+ 확대
import { useState, useEffect } from "react";
import style from "../CSS/File.module.css";

import axios from "axios";
// import { PDFViewer } from '@embedpdf/react-pdf-viewer';
import fileIcon from "../asset/icon-filelist.png";
import fileCenterHoverbefore from "../asset/icon-emptyfileHoverbefore.png";
import fileCenterHoverafter from "../asset/icon-emptyfileHoverafter.png";

function File({ isHost, token, onChange, clickedAgendaId, socketFile }) {

    const [listModal, setListModal] = useState(false);
    const [Files, setFiles] = useState([]);
    const [FileEmpty, setFileEmpty] = useState(false);
    const [FileChosenUrl, setFileChosenUrl] = useState(null);
    const [isPdf, setIsPdf] = useState();

    // 삭제하기 버튼 상태값
    const [x, setX] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST_URL}/file/${clickedAgendaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data);
                    // if (res.data !== null) {
                    //     setFileEmpty(true);
                    //     setFiles(res.data);
                    // }
                    setFiles(res.data);
                }
            })
            .catch((error) => {
                console.error("마이페이지 정보 가져오기 실패:", error);
            });
    }, [socketFile])
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
                }
            }
        )
            .catch(error => {
                console.error("파일 업로드 실패:", error);
            });
    }
    function HandleChoise(file) {
        setIsPdf(file.isPdf);
        setFileChosenUrl(file.fileUrl);
    }
    function DeleteFile(target) {
        axios.delete(`${process.env.REACT_APP_HOST_URL}/file/${target}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    setFiles(prev => prev.filter(file => file.id !== target.id));
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
            {FileEmpty === false ? <>
                <h1>asda</h1>
            </> : <>
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
                        : <img src={FileChosenUrl} />
                    }
                </div></>}
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
                        <div
                            id={file.fileId}
                            key={file.fileId}
                            className={style.box}
                            onMouseEnter={() => setX(file.fileId)}
                            onMouseLeave={() => setX(null)}
                            onClick={(e) => {
                                HandleChoise(file)
                            }}>
                            <img id={file.fileId} src={file.fileUrl} />
                            {x === file.fileId && isHost && <div id={file.fileId} className={style.Close} onClick={(e) => {
                                e.stopPropagation();
                                DeleteFile(file.fileId)
                            }}
                            //x버튼
                            ><h1 id={file.fileId}>+</h1></div>}
                        </div>

                    );
                })}
            </div>}

            <div className={style.Iconbox}><img alt="listicon" className={style.ListIcon} src={fileIcon} onMouseEnter={() => setListModal(true)} /></div>
        </div >
    );
}
export default File;
