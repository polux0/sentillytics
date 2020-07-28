import React from "react";

export const Auth = {
  isAuthenticated: false,
  userId: false,
  name: false,
  lastName: false,
  token: false,
  authenticate(cb) {

  	fetch(`${process.env.REACT_APP_API}/login`, 
	  	{
		   method: 'post',
		   headers: {'Content-Type':'application/x-www-form-urlencoded'},
		   body: JSON.stringify({
		    email: this.email,
        password: this.password
			})
	   	})
		.then(res => res.json())
      .then(
        (result) => {
        	if(result.success){
        		this.isAuthenticated = true;
            this.userId = result.data.id;
            this.name = result.data.name;
            this.lastName = result.data.last_name;
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userId', result.data.id);
        		console.log(result);
        		setTimeout(cb, 100);
        		
        	}else{
        		this.isAuthenticated = false;
        	}
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	console.log('error');
        }
      )


    
  },
  signout(cb) {
    this.isAuthenticated = false
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setTimeout(cb, 100)
  }
}