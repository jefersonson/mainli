import "dotenv/config";
import express, { request, response } from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();

//receber dados do formato JSON
app.use(express.json());

//*CRIAR conexões com o banco de dados
const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, //Sen@iDev77!.
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

// //Conectar ao banco
// conn.connect((err) => {
//     if (err) {
//     console.error(err);
//     }
//     console.log("MYSQL conectado!");
//     app.listen(PORT, () => {
//     console.log("servidor on PORT" + PORT);
//     });
// });

// app.get("/livros", (request, response) => {
//     const sql = /*sql*/ `SELECT * FROM livros`;
//     conn.query(sql, (err, data) => {
//     if (err) {
//         console.error(err);
//         response.status(500).json({ err: "Erro ao buscar livros" });
//         return;
//     }
//     const livros = data;
//     response.status(200).json(data);
//     });
// });

// app.post("/livros", (request, response) => {
//     const { titulo, autor, ano_publicacao, genero, preco } = request.body;

//   //!validação!!
//     if (!titulo) {
//     response.status(400).json({ err: "O titulo é obrigatório" });
//     return;
//     }
//     if (!autor) {
//     response.status(400).json({ err: "O autor é obrigatório" });
//     return;
//     }
//     if (!ano_publicacao) {
//     response.status(400).json({ err: "O ano da publicação é obrigatório" });
//     return;
//     }
//     if (!genero) {
//     response.status(400).json({ err: " O gênero é obrigatório" });
//     return;
//     }
//     if (!preco) {
//     response.status(400).json({ err: " O preço é obrigatório" });
//     return;
//     }

//   //verificar se o livro não foi cadastrado
//   const checkSql = /*sql*/ `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;
//     conn.query(checkSql, (err, data) => {
//     if (err) {
//         console.error(err);
//         response.status(500).json({ err: "Erro ao buscar livros" });
//         return;
//     }
//     if (data.length > 0) {
//         response.status(409).json({ err: "Livro já foi cadastrado" });
//         return;
//     }
//     //cadastrar o livro
//     const id = uuidv4();
//     const disponibilidade = 1;
//     const insertSql = /*sql*/ `INSERT INTO livros
//         (livro_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
//         VALUES
//         ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}", "${preco}", "${disponibilidade}")
//         `;
//     conn.query(insertSql, (err) => {
//         if (err) {
//         console.error(err);
//         response.status(500).json({ err: "Erro ao cadastrar livro" });
//         return;
//         }
//         response.status(201).json({ message: "Livro Cadastrado" });
//         });
//     });
// });

// //listar um
// app.get("/livros/:id", (request, response)=>{
//     const {id} = request.params

//     const sql = /*sql*/`SELECT * FROM livros WHERE livro_id = "${id}"`;
//     conn.query(sql, (err, data)=>{
//         if(err){
//             console.error(err)
//             response.status(500).json({err: "Erro ao buscar livro"})
//             return
//         }
//         if(data.length === 0){
//             response.status(404).json({err: "Livro não encontrado"})
//             return
//         }
//         const livro = data[0]
//         response.status(200).json(livro)
//     })
// })

// //atualizar
// app.put("/livros/:id", (request, response)=>{
//     const {id} = request.params
//     const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body
//     //!validação!!
//     if (!titulo) {
//         response.status(400).json({ err: "O titulo é obrigatório" });
//         return;
//         }
//         if (!autor) {
//         response.status(400).json({ err: "O autor é obrigatório" });
//         return;
//         }
//         if (!ano_publicacao) {
//         response.status(400).json({ err: "O ano da publicação é obrigatório" });
//         return;
//         }
//         if (!genero) {
//         response.status(400).json({ err: " O gênero é obrigatório" });
//         return;
//         }
//         if (!preco) {
//         response.status(400).json({ err: " O preço é obrigatório" });
//         return;
//         }
//         if(disponibilidade === undefined){
//             response.status(400).json({err: "A disponibilidade é obrigatório"});
//             return;
//         }
//         const sql = /*sql*/`SELECT * FROM livros WHERE livro_id = "${id}"`;
//     conn.query(sql, (err, data)=>{
//         if(err){
//             console.error(err)
//             response.status(500).json({err: "Erro ao buscar livro"});
//             return;
//         }
//         if(data.length === 0){
//             response.status(404).json({err: "Livro não encontrado"});
//             return;
//         }
//         const updateSql = /*sql*/`UPDATE livros SET 
//         titulo = "${titulo}", 
//         autor = "${autor}", 
//         ano_publicacao="${ano_publicacao}", 
//         genero="${genero}",
//         preco="${preco}", 
//         disponibilidade="${disponibilidade}"
//         WHERE livro_id = "${id}"`

//         conn.query(updateSql, (err, info)=>{
//             if(err){
//                 console.error(err)
//                 response.status(500).json({err:"Erro ao atualizar dados"})
//             }
//             console.log(info)
//             response.status(200).json({message:"Livro atualizado"})
//         })
//     })
// })

// //deletar
// app.delete("/livros/:id", (request, response)=>{
//     const {id} = request.params

//     const deleteSql = /*sql*/`DELETE FROM livros WHERE livro_id = "${id}"`
//     conn.query(deleteSql, (err, info) =>{
//         if(err){
//             console.error(err)
//             response.status(500).json({error:"Erro ao deletar livro"});
//             return;
//         }
//         if(info.affectedRows === 0){
//             response.status(404).json({error:"Livro não encontrado"});
//             return;
//         }
//         response.status(200).json("livro deletado")
//     }) 
// })

/*****************************ROTAS DE FUNCIONARIOS  ****************************/

/* Tabela(id, nome, cargo, data_contratacao, salario, email, created_at, updated_at)

*1º listar todos os funcionarios
*2º cadastrar todos os funcionarios
*3º listar um funcionario
*4º atualizar um funcionario (não pode ter o email de outro funcionario)
*5º deletar um funcionario
*/
// Listar todos os funcionários
app.get("/funcionarios", (req, res) => {
    const sql = `SELECT * FROM funcionarios`;
    conn.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: "Erro ao buscar funcionários" });
            return;
        }
        res.status(200).json(data);
    });
});

// Cadastrar um funcionário
app.post("/funcionarios", (req, res) => {
    let { nome, cargo, email, data_contratacao, salario } = req.body;

    // Validação
    if (!nome || !cargo || !data_contratacao || !email || !salario) {
        return res.status(400).json({ err: "Todos os campos são obrigatórios" });
    }

   
    try {
        data_contratacao = formatDate(data_contratacao);
    } catch (e) {
        return res.status(400).json({ err: "Formato de data inválido" });
    }


    const checkSql = `SELECT * FROM funcionarios WHERE nome = ? AND cargo = ? AND data_contratacao = ?`;
    conn.query(checkSql, [nome, cargo, data_contratacao], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: "Erro ao buscar funcionário" });
            return;
        }
        if (data.length > 0) {
            return res.status(409).json({ err: "Funcionário já cadastrado" });
        }

       
        const id = uuidv4();
        const insertSql = `INSERT INTO funcionarios (funcionario_id, nome, cargo, data_contratacao, salario, email) VALUES (?, ?, ?, ?, ?, ?)`;
        conn.query(insertSql, [id, nome, cargo, data_contratacao, salario, email], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ err: "Erro ao cadastrar funcionário" });
                return;
            }
            res.status(201).json({ message: "Funcionário cadastrado com sucesso" });
        });
    });
});


app.get("/funcionarios/:id", (request, response) => {
    const { id } = request.params;

    const sql = `SELECT * FROM funcionarios WHERE funcionario_id = ?`;
    conn.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            request.status(500).json({ err: "Erro ao buscar funcionário" });
            return;
        }
        if (data.length === 0) {
            return response.status(404).json({ err: "Funcionário não encontrado" });
        }
        response.status(200).json(data[0]);
    });
});


app.put("/funcionarios/:id", (request, response) => {
    const { id } = request.params;
    const { nome, cargo, data_contratacao, salario, email } = request.body;

    // Validação
    if (!nome || !cargo || !data_contratacao || !salario || !email) {
        return res.status(400).json({ err: "Todos os campos são obrigatórios" });
    }


    try {
        data_contratacao = formatDate(data_contratacao);
    } catch (e) {
        return response.status(400).json({ err: "Formato de data inválido" });
    }

 
    const checkSql = `SELECT * FROM funcionarios WHERE funcionario_id = ?`;
    conn.query(checkSql, [id], (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: "Erro ao buscar funcionário" });
            return;
        }
        if (data.length === 0) {
            return response.status(404).json({ err: "Funcionário não encontrado" });
        }

       
        const updateSql = `UPDATE funcionarios SET nome = ?, cargo = ?, data_contratacao = ?, salario = ?, email = ? WHERE funcionario_id = ?`;
        conn.query(updateSql, [nome, cargo, data_contratacao, salario, email, id], (err) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao atualizar funcionário" });
                return;
            }
            response.status(200).json({ message: "Funcionário atualizado com sucesso" });
        });
    });
});


app.delete("/funcionarios/:id", (request, response) => {
    const { id } = request.params;

    const deleteSql = `DELETE FROM funcionarios WHERE funcionario_id = ?`;
    conn.query(deleteSql, [id], (err, result) => {
        if (err) {
            console.error(err);
            response.status(500).json({ err: "Erro ao deletar funcionário" });
            return;
        }
        if (result.affectedRows === 0) {
            return response.status(404).json({ err: "Funcionário não encontrado" });
        }
    })
})