import axios from 'axios';

export default axios.create({

	baseURL:`${process.env.REACT_APP_API}`,
	headers: {'Content-Type':'application/x-www-form-urlencoded', 'Auth-Token': localStorage.getItem('token')},

})