//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputBlue'
import { TouchableOpacity } from 'react-native-gesture-handler'

//Importando serviços
import { autenticarCodigo } from '../../services/auth-service'

const TelaCadastroConfirmacaoSms = ({route, navigation}, props) => {

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [codigo, setCodigo] = useState('');

    //Coleta de dados de outras telas para passagem de parâmetros
    const {emailDigitado} =  route.params;

    //Tratamento de prévia do email para exibição
    const inicialEmail = emailDigitado.substr(0, 1)
    const finalEmail = emailDigitado.split('@')
    const emailFinal = inicialEmail + '*****' + finalEmail[1]

    const prosseguirCadastro = async(e) =>{
        //navigation.navigate('CadastroConclusao')

        try{
            
            //Verifica se o código digitado corresponde
            //ao código salvo no perfil que está tentando logar
            const response = await autenticarCodigo(codigo)

            //Se a resposta retornar 200 OK, encaminha para a próxima página
            if(response.ok){
                navigation.navigate('CadastroConclusao')
            }else{
                console.log('não vai rolar, kirido')
            }

        }catch(erro){
            console.log('entrei no catch')
            console.log(erro)
        }        

    }

    //Código para carregamento das fontes antes da renderização
    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    }

    async function loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                'montserrat-regular-texto': require('../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
                'montserrat-titulo': require('../../assets/fonts/montserrat/Montserrat-Light.ttf'),
                'montserrat-titulo-magro': require('../../assets/fonts/montserrat/Montserrat-Thin.ttf'),
                'montserrat-negrito': require('../../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
            }),
        ]);
    }

    function handleLoadingError(error) {
    console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Enviamos um código pro seu email cadastrado com final {emailFinal} só pra confirmar, pode verificar se chegou?</Text>
            <FloatingLabelInput
                label="Digite o código enviado"
                value={codigo ? codigo : ''}
                onChangeText={(texto) => setCodigo(texto)}
                keyboardType={'numeric'}
                maxLength={5}
            />
            <Image
                style={styles.image}
                source={require('../../assets/icons/message.png')}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={prosseguirCadastro}
                >
                <Text style={styles.button_texto}>CONFIRMAR</Text>
            </TouchableOpacity>
        </View>   
      )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    texto: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        margin: 30
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "#005E80",
        borderWidth: 2,
        borderRadius: 20
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#005E80",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    },

})

export default TelaCadastroConfirmacaoSms