import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from 'apollo-link-context'

import { createApolloProvider } from '@vue/apollo-option'

// Traer URL API Gateway
const {linkApiGateway} = require("./servidor");
console.log("API Gateway Link", linkApiGateway)

// Crea un link a partir de un string
const apiGatewayHttpLink = createHttpLink({
    uri: linkApiGateway,
})

// Un contexto para peticiones HTTP (es decir, algo que se puede añadir previo a hacer una peticion http). 
// En este caso, consisten en añadir el header para el token  
const authContexto = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": "Bearer " + localStorage.getItem("token_access") || ""
        }
    }
})

// Cliente GraphQL de Apollo. Utilizado para realizar las peticiones al API Gateway
const apolloCliente = new ApolloClient({
    link: authContexto.concat(apiGatewayHttpLink),
    cache: new InMemoryCache()
})


// Para permitir que los Componentes hagan peticiones al cliente de Apollo
const apolloProveedor = new createApolloProvider({
    defaultClient: apolloCliente
})

createApp(App).use(router).use(apolloProveedor).mount('#app')

// Nota: el que se esté "usando" el "apolloProveedor" permite, entre otras, que se acceda a la variable
//       global this.$apollo para realizar las peticiones
