import { useEffect, useRef, useState } from "react";
import Left from "../component/LeftList";
import Right from "../component/RightList";
import Header from "../component/Header";
import style from "../CSS/Meet.module.css";

import DM from "../asset/icon-DM.png";
function Meet() {

  const [isHost, setIshost] = useState(true);

  return (
    isHost ?
      <>
        <div className={style.extradiv}>
          <div className={style.Maindiv}>
            <div className={style.Header}>
              <Header />
            </div>
            <div className={style.Component}>
              <Left />
              <Right />
            </div>
            <div className={style.DM}>
              <img src={DM} />
            </div>
          </div>
        </div>
      </>
      :
      <>
        
      </>
  );
}

export default Meet;
