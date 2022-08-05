import "./ResultsDisplay.css";

interface Props {
	content: string;
}

export const ResultsDisplay = ({content}: Props) => {
	return <div className="Calculator--results"><h2>{content}</h2></div>;
};
