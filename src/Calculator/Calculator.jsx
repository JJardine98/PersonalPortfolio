import React from "react";
import "./Calculator.css";

const Calculator = () => {
    return (
        <div className="calculator">
            <div className="display"> 
                <input type="text" className="display-input" value="0" disabled />
                <div className="button-container">
                        <button>1</button>
                        <button>2</button>
                    </div>
                </div>
            </div>
    );
};

export default Calculator;