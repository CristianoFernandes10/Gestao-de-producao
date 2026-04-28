export const insert = async (data) =>{
    const {password, role, connection} = data
    console.log(password, role)

    try{
        const [result] = await connection.query(`
        INSERT INTO users (user, role, password) VALUES (?,?,?)`, ['PENDING', role, password])

        return {
            id: result.insertId,
            role
        }
    }catch (err){
        console.error('Erro ao inserir na tabela users')
        throw err

    }
    

}



export const update = async (data) =>{

    const {id, user, connection} = data
    try{

        const [result] = await connection.query(`
        UPDATE users SET user = ? WHERE id = ?`,[user, id])


        if(result.affectedRows === 0){
            console.log('Usuário não encontrado')
            return false
        }

        console.log('Nome de usuário atualizado com sucesso')
        return true

    }catch (err){
        console.error('Erro ao atualizar nome de usuário')
        throw err
    }
    
}