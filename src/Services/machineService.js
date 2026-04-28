import { insertMachines } from "../Helpers/Machine/machineHelper.js"
import { get } from "../Helpers/Machine/machineHelper.js"

export const create = async() =>{
    const result = await insertMachines()
    const idMaquinas = `M-${result.toString().padStart(4, "0")}`
    
    
    console.log('2. Service (ID Recebido):', result)
    return idMaquinas
} 


export const getMachines = async () =>{
    const result = await get()
    return result
}