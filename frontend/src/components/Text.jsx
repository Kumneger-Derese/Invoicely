const TextBox = ({children, color, className}) => {
    return (
        <span style={{color}} className={className}>{children}</span>
    );
};

export default TextBox;