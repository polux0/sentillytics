import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react'


export default class AddProject extends Component{

constructor(props){
	super(props);
}
onClick = () => this.props.onAddProjectHappend;
onClick1 = () => console.log('It happend');

render(){

	return <Icon link name='add circle' onClick={this.onClick}/>

}


}
