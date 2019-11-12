//@flow
import React from "react";
import type {Currency} from "../constants/Types";

type Props = {
    currency : Currency,
    balance  : number,
    onValueChange: (string) => void,
    onBlur: (string) => void,
    value: number,
    className: ?string
}
export const ExchangeInput = ({
                                  currency,
                                  balance,
                                  value,
                                  onValueChange = () => {}, 
                                  onBlur = () => {},
                                  className = ''
} : Props) => {
    return (
            <div className={`exchange-single-container ${className}`}>
                <div className="exchange-single-container__info">
                    <div className="exchange-single-container__codename">
                        {currency.code}
                    </div>
                    <div className="exchange-single-container__balance">
                        {`You have ${currency.char}${balance} on your wallet.`}
                    </div>
                </div>
                <div className="exchange-single-container__editable" >
                    <input
                        pattern="[0-9]"
                        className="exchange-single-container__editable__input"
                        type="text"
                        onBlur={(event) => onBlur(event.target.value)}
                        value={value} onChange={(event) => onValueChange((event.target.value))}
                    />
                </div>
            </div>
    )
};

export default ExchangeInput;
