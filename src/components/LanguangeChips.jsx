import clsx from "clsx";

export default function LanguangeChips(props) {
    return (
        <div 
            className={clsx (
                !props.alive && 'lost'
            )} 
            style={props.style}>
            {props.name}
        </div>
    )
}