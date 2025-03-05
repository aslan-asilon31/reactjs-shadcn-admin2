//import axios
import axios from 'axios';

const mainApi = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 100000,
    headers: {'X-Custom-Header': 'foobar'}
    // headers: {'Authorization': 'Bearer yourToken'}
})

export default mainApi