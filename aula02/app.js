import express from "express"
const app = express();
const PORT = 3000;

app.use(express.json());//mediador que vai tratar/ouvir as requisições para o formato json


//Banco de dados em memória
let usuarios = [
{id:1, nome: "Amanda", email: "amandakayvic@hotmail.com", telefone: "+1 (751) 0800 090090"},
{id:2, nome: "Calebe", email: "calebechlcorreia@hotmail.com", telefone: "+1 (751) 0900 080080"}
]

app.get("/",(req, res)=>{
    res.status(200).send("Hello World!")
});

app.get("/api/usuarios", (req, res)=>{
    res.status(200).json({"usuarios": usuarios});
});

app.get("/api/usuarios/:id", (req, res)=>{
    const {id}= req.params;
    const usuario = usuarios.findIndex(u=> u.id === parseInt(id));
        if(index===-1){
            res.status(404).json({"msg": "usuario encontrado.", usuario});
        }
    res.status(200).json({"mensagem":"usuário encontrado.", usuario});

})



app.post("/api/usuarios", (req, res)=>{
    const {nome, email, telefone} = req.body;
    if(!nome || !email || !telefone){
res.status(400).json({"mensagem":"Todos os campos são obrigatórios"});
return
    }
const novoUsuario = {id:usuarios.length + 1, nome: nome,email: email,telefome: telefone}
usuarios.push(novoUsuario);

res.status(201).json({"mensagem":"Usuário criado com sucesso!", "usuario": novoUsuario})
})


app.put("/api/usuarios/:id", (req, res)=>{
    const {id} = req.params;
    const {nome, email, telefone} = req.body;
 if(!nome || !email || !telefone){
res.status(400).json({"mensagem":"Todos os campos são obrigatórios"});
return}
})










app.listen(PORT, ()=>{
    console.log(`Aplicação rodando em http://localhost:${PORT}`)
});

