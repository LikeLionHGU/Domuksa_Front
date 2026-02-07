//룸에 있는 안건에 있는 파일 불러오기+ 확대

import style from "../CSS/File.module.css";
import { RPConfig,RPTheme,RPProvider,RPDefaultLayout,RPPages } from "@pdf-viewer/react";

function File() {

    return (
        <div className={style.Maindiv}>
            <div className={style.Maintitle}>
                <h3>파일</h3>
            </div>
            <div className={style.Viewer}>
                <RPConfig>                {/* Configuration license and pdfjs-dist worker */}
                    <RPTheme>               {/* Theme customization (optional) */}
                        <RPProvider src="/test.pdf">          {/* Viewer context provider */}
                            <RPDefaultLayout>   {/* Default layout container */}
                                <RPPages />       {/* PDF pages renderer */}
                            </RPDefaultLayout>
                        </RPProvider>
                    </RPTheme>
                </RPConfig>
            </div>
        </div >
    );
}
export default File;
