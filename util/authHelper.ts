import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";


export async function tokenCheck() : Promise<Boolean> {

    let token: any = await AsyncStorage.getItem("token");
    
    let userStatus = false;



    if (token) {

        await axios.post("http://localhost:3000/token", { token: token })
            .then(res => {
                userStatus = true
            })
            .catch(err => {
                userStatus = false;
            })
    }
    else {
        return false;
    }

    return userStatus;
}