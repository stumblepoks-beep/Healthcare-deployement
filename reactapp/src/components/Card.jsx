import { apidelete } from "../apiservice"
import deleteIcon from '../assets/delete.svg';
import { useLoading } from "../LoadingContext";
export default function Card(props){
    const {setLoading} = useLoading();
    return(
        <div className="outBox">
        <div className="heading-row">
            <h2>{props.heading}</h2>
            <button
            onClick={async () => {
                setLoading(true);
                try{
                    await apidelete('/api/healthconditions', {condition: props.heading});
                    props.refresh();
                }catch(error){
                    console.log("card error (API)");
                }finally{
                    setLoading(false);
                }
            }}
            className="delete-btn-med"
            >
            <img src={deleteIcon} alt="delete" />
            </button>
        </div>
        <p>{props.description}</p>
        </div>
    )
}