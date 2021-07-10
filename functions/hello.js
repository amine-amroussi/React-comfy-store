
const items = [{
    id : 1 , name : 'hamza',
    id : 2 , name : "ayoub"
}]

exports.handler = async function(event , context){
    return {
        statusCode : 200,
        body : "Hello World !"
    }
}