//@flow
import React from "react";

type Props = {
    onLeftClick: () => void,
    onRightClick: () => void,
    children: React$Node,
    className: string
}
export const ExchangeSlide = ({
                                  onLeftClick = () => { },
                                  onRightClick = () => { },
                                  className = '',
                                  children
} : Props) => {
    return (
            <div className={`exchange-slide ${className}`}>
                    <button className="exchange-slide__button" onClick={onLeftClick}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                   
                    <div>
                        {children}
                    </div>
                    <button className="exchange-slide__button" onClick={onRightClick}>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </button>
            </div>
    )
};

export default React.memo(ExchangeSlide);
