import axios from "axios";

class DataManager {
    constructor(url) {
        this.url = url;
    }

    fetch(query) {
        return axios.get(this.url + encodeURIComponent(query));
    }
}

export default DataManager;