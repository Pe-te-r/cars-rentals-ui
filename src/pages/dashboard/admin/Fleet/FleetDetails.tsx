import { useParams } from "react-router-dom"
import { useOneFleetQuery } from "../../../../features/fleetSlice"
import { useEffect } from "react"

const FleetDetails = () => {
    const {id}= useParams()
    const {data,isSuccess} = useOneFleetQuery({id: Number(id),details:true})
    useEffect(()=>{
        if(isSuccess){
            console.log(data)
        }
    },[data,isSuccess])
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}

export default FleetDetails
