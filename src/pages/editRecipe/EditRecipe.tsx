import { useParams } from "react-router"

export default function EditRecipe(){
    let {id} = useParams();

    return (
        <>edit recipe page</>
    )
}