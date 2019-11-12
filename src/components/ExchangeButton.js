//@flow
import React from "react";

type Props = {
    label : string,
    isDisabled: boolean,
    onClick: () => void
}
export const ExchangeButton = ({
                                  onClick,
                                  isDisabled,
                                  label
} : Props) => {

    const classNames = !isDisabled ? 'exchange-button' : 'exchange-button exchange-button--disabled';
    return (
     <button 
        onClick={() => onClick()}
        className={classNames}
        disabled={isDisabled} >
            {label}
    </button>
    )
};

export default React.memo(ExchangeButton);
