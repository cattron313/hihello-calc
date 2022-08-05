import React, {useState, useEffect} from "react";
import './Calculator.css';

import {Controls, DIGITS, OPERATORS, SPECIAL} from "../Controls";
import {ResultsDisplay} from "../ResultsDisplay";
import {EquationDisplay} from "../EquationDisplay";


interface Props {

}

const INITIAL_STATE = ["0"];

const calculate = (equation: string[]): string => {
	if (equation[equation.length - 1] === "=") {
		equation = equation.slice(0, equation.length - 1);
	}

	let reducedEquation = [...equation];
	for (let i = 0; i < equation.length; i++) {
		if (equation[i] === "\u00F7") {
			reducedEquation.splice(i - 1, 3, (parseFloat(equation[i - 1]) / parseFloat(equation[i + 1])).toString())
		} else if (equation[i] === "\u00D7") {
			reducedEquation.splice(i - 1, 3, (parseFloat(equation[i - 1]) * parseFloat(equation[i + 1])).toString())
		}
	}

	while (reducedEquation.length > 1) {
		const operandA = reducedEquation.shift() ?? "";
		const operator = reducedEquation.shift() ?? "";
		const operandB = reducedEquation.shift() ?? "";

		if (operator === "+") {
			reducedEquation.unshift((parseFloat(operandA) + parseFloat(operandB)).toString());
		} else {
			reducedEquation.unshift((parseFloat(operandA) - parseFloat(operandB)).toString());
		}
	}

	return reducedEquation[0];
};

export const Calculator = (props: Props) => {
	const [result, setResult] = useState(INITIAL_STATE[0]);
	const [equation, setEquation] = useState<string[]>(INITIAL_STATE);

	const handleInput = (btnName: string) => {
		const isEquationAtInitState = equation.length === 1 && equation[0] === INITIAL_STATE[0];

		if (DIGITS.includes(btnName)) {
			if (result === INITIAL_STATE[0] && isEquationAtInitState) {
				setResult(btnName);
				setEquation([btnName]);
			} else if (result === INITIAL_STATE[0] || OPERATORS.includes(equation[equation.length - 1])) {
				setResult(btnName);
				setEquation((prev) => {
					return prev[prev.length - 1] === INITIAL_STATE[0] ?
						prev.slice(0, prev.length - 1).concat(btnName) :
						[...prev, btnName];
				});
			} else {
				setResult((prev) => {
					const num = prev + btnName;
					setEquation((prev) => prev.slice(0, prev.length - 1).concat(num));
					return num;
				});
			}
		} else if (OPERATORS.includes(btnName)) {
			if (btnName === "=") {
				setResult(calculate(equation));
			}

			if (isEquationAtInitState || !Number.isNaN(parseFloat(equation[equation.length - 1]))) {
				setEquation((prev) => [...prev, btnName]);
			}
		} else if (SPECIAL.includes(btnName)) {
			switch (btnName) {
				case "C":
					if (result === INITIAL_STATE[0]) {
						setEquation(INITIAL_STATE);
					} else if (equation[equation.length - 1] === "=") {
						setResult(INITIAL_STATE[0]);
						setEquation(INITIAL_STATE);
					} else if (OPERATORS.includes(equation[equation.length - 1])) {
						setEquation((prev) => prev.slice(0, prev.length - 1));
					} else if (!Number.isNaN(parseFloat(result))) {
						setResult(INITIAL_STATE[0]);
						setEquation((prev) => prev.slice(0, prev.length - 1).concat(INITIAL_STATE[0]));
					}
					break;
				case ".":
					if (!result.includes(".")) {
						setResult((prev) => {
							if (!Number.isNaN(parseFloat(equation[equation.length - 1]))) {
								const num = prev + ".";
								setEquation((prev) => prev.slice(0, prev.length - 1).concat(num));
								return num;
							}
							return INITIAL_STATE[0] + ".";
						});
					}
					break;
				case "\u00B1":
					setResult((prev) => {
						if (!Number.isNaN(parseFloat(equation[equation.length - 1]))) {
							const num = prev[0] === "-" ? prev.slice(1) : "-" + prev;
							setEquation((prev) => prev.slice(0, prev.length - 1).concat(num));
							return num;
						}
						return "-" + INITIAL_STATE[0];
					});
					break;
			}
		}
	};

	return (
		<div className="Calculator">
			<ResultsDisplay content={result} />
			<EquationDisplay content={equation} />
			<Controls onInput={handleInput} />
		</div>
	);
};
