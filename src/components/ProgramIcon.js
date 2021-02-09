export function ProgramIcon(props) {
    return <div className="icon-container">
        <div className="icon">
            {props.icon}
        </div>
        <div>{props.text}</div>
    </div>;
}