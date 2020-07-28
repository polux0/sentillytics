import React, { Component } from 'react';
import {Chart} from '../components/Chart';
import {Auth} from '../components/Auth';


class Project extends Component {

	constructor(props) {
	    super(props);
      console.log('user id: ' + Auth.userId);
      this.state = { 
        userId: Auth.userId,
        userName: Auth.name,
        userLastName: Auth.lastName,
        project: [],
        keywords: [],
        inputKeyword: '',
        posts: [],
        countries: [],
        selectedCountry: '',
        projectCountries: []
      };

      this.handleKeywordChange = this.handleKeywordChange.bind(this);
      this.addKeyword = this.addKeyword.bind(this);
      this.removeKeyword = this.removeKeyword.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.getCountries = this.getCountries.bind(this);
      this.handleSelectedCountry = this.handleSelectedCountry.bind(this);
      this.addCountry = this.addCountry.bind(this);
      this.getProjectCountries = this.getProjectCountries.bind(this);
      
	}

  getProjectKeywords(){
    fetch(`${process.env.REACT_APP_API}/keywords/project`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          Auth,
          projectId: this.props.match.params.id
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          console.log('test: ');
          console.log(result);
          this.setState({
            keywords: result.data.keywords
          });
          console.log(this.state.keywords);
          this.getProjectPosts(this.state.keywords);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  getAllKeywords(){
    fetch(`${process.env.REACT_APP_API}/keywords/all`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          Auth,
          projectId: this.props.match.params.id
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            keywords: result.data
          });


          //console.log(this.state.keywords);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  getCountries(){
    fetch(`${process.env.REACT_APP_API}/location/countries`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({

        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            countries: result.data
          });


          console.log(this.state.countries);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  getProjectPosts(keywords){

    let k = [];
    keywords.map(function(item, index){
      k.push(item.name);
    });
    fetch("http://api.sentilytics.com/cron/get_posts_preview", 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          keywords: k,
          negativeKeywords: ['macka','termos']
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            posts: result.data
          });
          //console.log(this.state.keywords);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      )
  }

  getProjectCountries(){
    fetch(`${process.env.REACT_APP_API}/project/countries`, 
    {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify({
        Auth,
        projectId: this.props.match.params.id
      })
     })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({
          projectCountries: result.data
        });


        console.log(this.state.countries);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          // isLoaded: true,
          // error
        });
      }
    )
  }

  componentDidMount() {

    //this.getAllKeywords();

    this.getProjectKeywords();
    this.getCountries();
    this.getProjectCountries();

    

    // fetch(`${process.env.REACT_APP_API}/project/get`, 
    //   {
    //     method: 'post',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     body: JSON.stringify({
    //       Auth,
    //       id: this.props.match.params.id
    //     })
    //    })
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //       this.setState({
    //         project: result.data
    //       });
    //       console.log(this.state.project);
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         // isLoaded: true,
    //         // error
    //       });
    //     }
    //   )


  }

  handleClick(event){
    console.log('test handle click');
  }

  handleKeywordChange(event){
    this.setState({inputKeyword: event.target.value});
    console.log(this.state);
  }

  addKeyword(event) {
    fetch(`${process.env.REACT_APP_API}/keywords/add`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          Auth,
          projectId: this.props.match.params.id,
          keyword: this.state.inputKeyword
          
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          this.getProjectKeywords();
          console.log(result);
        },
        (error) => {
        }
      );

     event.preventDefault();
  }

  removeKeyword(keywordId) {

    console.log(this.props.match.params.id);
    fetch(`${process.env.REACT_APP_API}/keywords/remove`, 
      {
        method: 'post',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: JSON.stringify({
          Auth,
          projectId: this.props.match.params.id,
          keywordId: keywordId
          
        })
       })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.getProjectKeywords();
          // this.setState({
          //   projects: result.data
          // });
          //console.log(this.state.projects);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            // isLoaded: true,
            // error
          });
        }
      );

     //event.preventDefault();
  }

  handleSelectedCountry(event){
    console.log('çountry select');
    this.setState({selectedCountry: event.target.value});
    console.log(this.state.selectedCountry);
  }

  addCountry(){
    fetch(`${process.env.REACT_APP_API}/project/add-country`, 
    {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify({
        Auth,
        projectId: this.props.match.params.id,
        countryId: this.state.selectedCountry
      })
     })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.getProjectKeywords();
        this.getProjectCountries();
      },
      (error) => {

      }
    );
  }

  removeCountry(countryId){
    fetch(`${process.env.REACT_APP_API}/project/remove-country`, 
    {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: JSON.stringify({
        Auth,
        projectId: this.props.match.params.id,
        countryId: countryId
      })
     })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.getProjectKeywords();
        this.getProjectCountries();
      },
      (error) => {

      }
    );
  }
  

  render() {

    return (
      <div>
        <div className="project-settings">
        <h1>{this.state.project.name}</h1>
        <p>{this.state.project.description}</p>
        <p>Project id: {this.props.match.params.id}</p>
        <h3>Keywords:</h3>
        {this.state.keywords.map(function(item, index){
          return(
              <div className="keyword" key={index} >
                {item.name}
                <button className="keyword-delete-button" onClick={() => this.removeKeyword(item.id)} key={item.id} >X</button>
              </div>
            );
        }, this)}
        <form onSubmit={this.addKeyword}>
          <label>
            <br />Add Keyword:
            <br /><input type="text" value={this.state.inputKeyword} onChange={this.handleKeywordChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h3>Countries:</h3>
        
          {this.state.projectCountries.map(function(item, index){
            return(
                <div className="keyword" key={index} >
                  {item.name}
                  <button className="keyword-delete-button" onClick={() => this.removeCountry(item.id)} key={item.id} >X</button>
                </div>
              );
          }, this)}
          <label className="label">select country:<br />
          <select value={this.state.selectedCountry} onChange={this.handleSelectedCountry}>
          <option >Select Country</option>
            {this.state.countries.map(function(item, index){
              return(
                <option value={item.id} key={index}>{item.name}</option>
              )},this
            )};
          </select>
          <button onClick={this.addCountry} >Add Country</button>
        </label>
        </div>
        <div className="project-posts">
        <h3>Posts:</h3>
        {this.state.posts.map(function(post, index){
          return(
              <div className="post" key={index} >
                {post.fullText}
              </div>
            );
        }, this)}
        </div>
        
      </div>
      
    )
  }
}

export default Project;