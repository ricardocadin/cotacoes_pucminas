
const getPrice = (symbol, callback) => {
    setTimeout(() => {
        const data = {
            symbol: 'SMLS3.SA',
            price: 13
        }

        callback(data)
    }, 2000)
}

getPrice('SMLS3.SA', (data) => {
    console.log(data)
})