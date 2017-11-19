import $ from 'jquery'
import axios from 'axios'

window.$ = window.jQuery = $

window.axios = axios
window.axios.defaults.baseURL = 'http://localhost:8000/v1'
window.axios.defaults.timeout = 1000
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
