import "./EquationDisplay.css";

interface Props {
	content: string[];
}

export const EquationDisplay = ({content}: Props) => {
	return <h3 className="Calculator--equation">{content.join(" ")}</h3>;
};
