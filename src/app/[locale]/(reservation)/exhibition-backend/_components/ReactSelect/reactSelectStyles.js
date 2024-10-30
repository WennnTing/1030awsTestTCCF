const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? "1px solid #4EAC85" : "1px solid #ccc",
        height: "40px",
        borderColor: "#ccc",
        borderWidth: "1px",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#EAEAEA" : "white",
        color: state.isSelected ? "black" : "gray",
        "&:hover": {
            backgroundColor: "lightgray",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: "16px",
        lineHeight: "1.5",
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 999,
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: "16px",
        lineHeight: "40px",
        color: "gray",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#252525",
    }),
};

export default customStyles;
