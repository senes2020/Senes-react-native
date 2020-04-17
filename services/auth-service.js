import {doRequest} from './doRequest'
import { AsyncStorage } from 'react-native'

//Definindo chave para salvar o dado no WebStorage
const SESSION_KEY = '@senes:session'

const setSession = (usuario) => {
    AsyncStorage.setItem(SESSION_KEY, JSON.stringify(usuario))
}

//Montar serviço para: 
//enviar CPF, retornar telefone e chamar serviço de envio de código
//enviar código como SMS e armazenar esse código gerado
//enviar código recebido pelo usuário e liberar entrada
//verificar se usuário recebido tem dois perfis e encaminhar adequadamente

export const cadastrar = async (usuario) => {

    //Método definido em doRequest.js
    //função genérica que realiza as requisições
    const response = await doRequest('registrar/', 'POST', usuario)
    console.log(response)

    if(response.ok){
        const usuario = await response.json()
        setSession(usuario)
    }

    return response

}

//Realiza o request de autenticação do usuário
//retornando a response e setando o token no webStorage
export const autenticarCpf = async (cpf) =>{

    const response = await doRequest('autenticar/cpf/', 'GET', '', cpf)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

//Realiza o request de autenticação do usuário
//retornando a response e setando o token no webStorage
export const autenticarCodigo = async (codigo) =>{

    const response = await doRequest('autenticar/codigo/', 'GET', '', codigo)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

//Verifica se o usuário está logado através da existência do Token
export const isSignedIn = async () =>{

    const session = await AsyncStorage.getItem(SESSION_KEY)
    return JSON.parse(session)
}

//Deslogando o usuário, removendo o token armazenado
export const signOut = () => {
    return AsyncStorage.removeItem(SESSION_KEY)
}