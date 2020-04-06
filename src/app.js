//por boas práticas os conteúdos core do node são declarados primeiro
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getCotacao = require('./util/cotacao.js')

// para ativar o nodemon para outros arquivos quando salvar é so usar o "-e js,hbs" que habilita. Exemplo: app.js -s js,hbs

//Path é um módulo para manipular diretorios
// por padrão no node existem as variáveis __dirname e __filename que buscam o diretorio onde o projeto está sendo executado
// usando a função join do módulo path é possível manipular os diretorios mais fácil

const pathStaticPublic = path.join(__dirname, '../public')
const pathViewsHbs = path.join(__dirname, "../templates/views")
const pathPartials = path.join(__dirname, "../templates/partials")

const app = express()
//setando o hbs https://www.npmjs.com/package/hbs
app.set('view engine', 'hbs')
// colocando um path de views, sem ser o padrão "views"
app.set("views", pathViewsHbs)
//setando o diretorio de partials views
hbs.registerPartials(pathPartials)

//usando um diretorio estatico para buscar as informações
app.use(express.static(pathStaticPublic))



// iniciar configurações do npm automáticas = npm init -y
// definindo rotas
// quando se tem um diretorio estatico não precisa definir as rotas que o node aponta para lá e pega a página de acordo com a rota que você digitou. Exemplo: http://localhost:3000/help.html


app.get('', (req, res) => {
    res.render('index', {
        title: "Cotações",
        author: "Concordia"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Ajuda",
        author: "Concordia"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Sobre",
        author: "Concordia"
    })
})

app.get('/cotacoes', (req, res) => {
    // se nao informou "ativo" na querystring
    if (!req.query.ativo) {
        return res.status(400).json({
            message: `O ativo deve ser informado`,
            code: 400
        })
    }

    getCotacao(req.query.ativo.toUpperCase(), (data, error) => {
        if (error) {
             return res.status(error.code).json({
                message: error.errorMessage,
                code: error.code
            })
        }

        res.status(200).json(data)
    })
})

// tudo que nao tiver rota cai aquu
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        author: "Concordia",
        errorMessage: "Página não encontrada"
    })
})

//publicar no horoku, criar conta, baixar o cli e subir o projeto
//horoku keys:add
//Yes
//horoku create cotacoes-cursonodejs
//git push heroku master 
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`)
})