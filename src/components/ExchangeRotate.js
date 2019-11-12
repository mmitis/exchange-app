//@flow
import React from "react";

type Props = {
    onClick: () => void
}
export const ExchangeRotate = ({ onClick } : Props) => {
    return (
            <div className="exchange-rotate">
                <button className="exchange-rotate__button" onClick={onClick} >
                    <i className="material-icons">swap_vert</i>
                </button>
            </div>
    )
};

export default React.memo(ExchangeRotate);
