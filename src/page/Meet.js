import { useEffect, useRef, useState } from "react";

function Meet() {

  const [isHost, setIshost] = useState(true);

  return (
    isHost ?
      <div>
        {/* 왼쪽 요소+ 오른쪽 요소 */}
      </div>
      :
      <div>

      </div>
  );
}

export default Meet;
