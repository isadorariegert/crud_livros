//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
let id = 1;
let ISBN = 999999;
let livros = [{
    id: 1,
    ISBN: 999999,
    titulo: "Moinho dos Ventos Uivantes",
    descricao: "11223344",
    edicao: "10.1",
    autor: " Emily Brontë"
}];

//tratamento de requisições POST
app.post("/livros", (req, res, next) => {
    const livro = {
        id: id += 1,
        ISBN: ISBN += 99,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor
    }
    livros.push(livro)
    res.status(201).json(livros);
});
//tratamento de requisições GET
app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
})

//tratamento de requisições PUT

app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id || livro.ISBN === req.body.ISBN) {
            livro.titulo = req.body.titulo
            livro.descricao = req.body.descricao
            livro.edicao = req.body.edicao
            livro.autor = req.body.autor
        }
    })
    res.status(204).end();
});

app.delete('/livros/:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) => {
        if (livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    res.status(200).json(livros);
});

app.delete("/livros", (req, res, next) => {
    livros.forEach(livro => {
        if (livro.id === req.body.id || livro.ISBN === req.body.ISBN) {
            const index = livros.indexOf(livro, 0)
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros);
});


//tratamento de requisições DELETE
// let alunos2 = [];
// app.delete("/alunos", (req, res, next) => {
//     alunos.forEach((aluno) => {
//         if (aluno.id != req.body.id) {
//             const aluno2 = {
//                 id: aluno.id,
//                 nome: aluno.nome,
//                 fone: aluno.fone,
//                 email: aluno.email
//             }
//             alunos2.push(aluno2)
//         }
//     })
//     alunos = alunos2;
//     res.status(204).end();
// });