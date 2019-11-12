//@flow
import React from "react";

type Props = {
    ratio: number,
    ratioCharFrom: string,
    ratioCharTo: string
}
export const RatioDisplay = ({
                                  ratio, ratioCharFrom, ratioCharTo
} : Props) => {
    return (
            <div className="ratio-display">
                <span className="ratio-display__counter">{ratioCharFrom}1 = {ratioCharTo}{ratio.toFixed(2)}</span>
            </div>
    )
};

export default React.memo(RatioDisplay);
