import "./Controls.css";

export const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => digit.toString());
export const OPERATORS = ["+", "-", "\u00F7", "\u00D7", "="];
export const SPECIAL = ["C", "\u00B1", "."];

const BUTTON_ORDER = [
	"C", "\u00B1", ".", "\u00F7",
	"9", "8", "7", "\u00D7",
	"6", "5", "4", "-",
	"3", "2", "1", "+",
	"0", "=",
];

interface Props {
	onInput: (btnName: string) => void;
}

export const Controls = ({onInput}: Props) => {
	return (
		<div className="Calculator--controls">
			{BUTTON_ORDER.map((btn) => {
				const classNames: string[] = [];
				if (btn === "0") {
					classNames.push("wide");
				}
				if (btn === "=") {
					classNames.push("accent");
				}
				if (DIGITS.includes(btn)) {
					classNames.push("digit");
				}
				return (
					<button className={classNames.join(" ")} onClick={() => onInput(btn)} key={btn}>
						{btn}
					</button>
				);
			})}
		</div>
	)
};
