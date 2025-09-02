import { apidelete } from "../apiservice"
import deleteIcon from '../assets/delete.svg';
export default function Card(props){
    return(
        <div className="outBox">
        <div className="heading-row">
            <h2>{props.heading}</h2>
            <button
            onClick={async () => {
                await apidelete('/api/medications', {medication: props.heading});
                props.refresh();
            }}
            className="delete-btn"
            >
            <img src={deleteIcon} alt="delete" />
            </button>
        </div>
        <p>{props.description}</p>
        </div>
    )
}