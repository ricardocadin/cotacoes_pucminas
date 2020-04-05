const request = require('request')
const token = 'VCLjVqd7okA2XywPe30M428BzntSpYBgbifjVsVhKOHTQ1dWJu57xlszEIit'

const getCotacao = (symbol, callback) => {
    const url_request = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${token}`

    request({url: url_request, json: true}, (error, response) => {
        if (error) {
            return callback(null, {
                errorMessage: `Algo deu errado: ${error}`,
                code: 404
            })
        }

        if(response.body.data === undefined || response.body.data[0] === undefined) {
            return callback(null, {
                errorMessage: `Sem dados de retorno`,
                code: 404
            })
        }

        const objetoPrincipal = response.body.data[0]

        // ja extrai de dentro do objeto principal os parâmetros
        const {symbol, price_open, price, day_high, day_low} = objetoPrincipal
        
        // const data = {
        //     id: response.body.data[0].symbol,
        //     description: response.body.data[0].name,
        //     price: response.body.data[0].price
        // }

        callback({symbol, price_open, price, day_high, day_low}, null)
    })
}

module.exports = getCotacao