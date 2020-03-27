//Recursos do React/React Native
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando input com label flutuante
import FloatingLabelInput from './FloatingLabelInput'

//Fonte: https://www.npmjs.com/package/react-native-simple-toast
//Importando toast simples para avisos de validação
import Toast from 'react-native-simple-toast';

const TelaAutenticacaoSms = ({navigation}, props) =>{

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [codigo, setCodigo] = useState('')

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
                'montserrat-regular-texto': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
                'montserrat-titulo': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
                'montserrat-titulo-magro': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
                'montserrat-negrito': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
            }),
        ]);
    }

    function handleLoadingError(error) {
    console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
    }

    const escolherPerfilAutenticacao = (e) =>{
        codigo ? navigation.navigate('AutenticacaoPerfil') : Toast.show('Por gentileza, insira o código enviado')
    }

    return (
        <View style={styles.container}>
           <Image
          style={styles.image_logo}
          source={require('../assets/logo/logo_png_light.png')}
        />
         <Text style={styles.texto}>
            Enviamos um código para o seu número com final (**)*****-3456 cadastrado.
            Confirme que você é o dono dele ^^
         </Text>
         
         <FloatingLabelInput
            label="Digite seu código ^^"
            value={codigo ? codigo : ''}
            onChange={(texto) => setCodigo(texto)}
            maxLength={6}
            keyboardType={'numeric'}
        />

        <TouchableOpacity
         style={styles.button}
         onPress={escolherPerfilAutenticacao}
        >
         <Text style={styles.button_texto}> CONFIRMAR</Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.button_info}
        >
         <Text style={styles.button_texto}>i</Text>
       </TouchableOpacity>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 17,
        marginTop: 0,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20
    },
    image_logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    input: {
        height: 50,
        margin: 30,
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20
    },
    button_info: {
        height: 50,
        width: 50,
        margin: 30,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 60
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
})

export default TelaAutenticacaoSms