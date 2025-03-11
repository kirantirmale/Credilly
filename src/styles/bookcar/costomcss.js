export const customStyles = {
	control: (provided) => ({
		...provided,
		backgroundColor: "#111827",
		border: "1px solid #4b5563",
		borderRadius: "10px",
		color: "white",
		padding: "2px",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "white", // Selected value text color
	}),
	placeholder: (provided) => ({
		...provided,
		color: "#f7faff",
	}),
	input: (provided) => ({
		...provided,
		color: "white", // Input text color when searching
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "#111827",
	}),
	option: (provided, state) => ({
		...provided,
		color: state.isFocused ? "white" : "white",
		backgroundColor: state.isFocused ? "#0d9488" : "#111827",
	}),
};