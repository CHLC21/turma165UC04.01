import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware para JSON

// "Banco de dados" em memória
let usuarios = [
    { id: 1, nome: "Amanda", email: "amandakayvic@hotmail.com", telefone: "+1 (751) 0800 090090" },
    { id: 2, nome: "Calebe", email: "calebechlcorreia@hotmail.com", telefone: "+1 (751) 0900 080080" }
];

// Rota principal
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

// GET todos os usuários
app.get("/api/usuarios", (req, res) => {
    res.status(200).json({ usuarios });
});

// GET usuário por ID
app.get("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json({
        mensagem: "Usuário encontrado",
        usuario
    });
});

// POST criar usuário
app.post("/api/usuarios", (req, res) => {
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        telefone
    };

    usuarios.push(novoUsuario);

    res.status(201).json({
        mensagem: "Usuário criado com sucesso!",
        usuario: novoUsuario
    });
});

// PUT atualizar usuário
app.put("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    const index = usuarios.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Nenhum usuário encontrado com este ID"
        });
    }

    usuarios[index] = {
        id: parseInt(id),
        nome,
        email,
        telefone
    };

    res.status(200).json({
        mensagem: "Usuário atualizado com sucesso",
        usuario: usuarios[index]
    });
});

// DELETE usuário
app.delete("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({
            mensagem: "Nenhum usuário encontrado"
        });
    }

    usuarios = usuarios.filter(u => u.id !== parseInt(id));

    res.status(200).json({
        mensagem: "Usuário deletado com sucesso"
    });
});

// Servidor
app.listen(PORT, () => {
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
