import { create } from '../Services/machineService.js'
import { getMachines } from '../Services/machineService.js'

export const createMachines = async(req, res) =>{
    const result = await create()

    console.log('3. Controller (String Final):', result)
    return res.status(201).json({
        message:'Máquina inserida com sucesso', 
        data: result
    })
    
}



export const getAllMachines = async (req, res)=>{
    const result = await getMachines()
    return res.status(200).json({data: result})
}