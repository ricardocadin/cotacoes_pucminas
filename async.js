const request = require('request')
const token = 'VCLjVqd7okA2XywPe30M428BzntSpYBgbifjVsVhKOHTQ1dWJu57xlszEIit'

const getCotacao = (symbol, callback) => {
    const url_request = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${token}`

    request({url: url_request, json: true}, (error, response) => {
        const objetoParsed = response.body
        
        const data = {
            id: response.body.data[0].symbol,
            description: response.body.data[0].name,
            price: response.body.data[0].price
        }

        callback(data)
    })
}

getCotacao('SMLS3.SA', (data) => {
    console.log(data)
})

module.exports = {
    getCotacao
}