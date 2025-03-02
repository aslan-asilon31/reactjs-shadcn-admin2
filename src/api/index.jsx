//import axios
import axios from 'axios';

const index = axios.create({
    //set default endpoint API
    baseURL: 'http://localhost:8000'
})

export default index