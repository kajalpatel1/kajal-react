import React from "react";
import ReactDOM from "react-dom";

/*import Layout from "./components/Layout";*/

const app = document.getElementById('app');

//creating react component

var Board=React.createClass({

    getInitialState:function(){
        return{comments:['Have a nice day', 'Hello World','Monday Morning']}
    },
    eachComment:function(text,i){
    return(<Comment key={i} index={i} deleteFromBoard={this.removeComment} updateCommentText={this.updateComment}>{text}</Comment>);
},
    removeComment:function(i){
        console.log("Removing"+i);
        var arr=this.state.comments;
        arr.splice(i,1);
        this.setState({comments:arr});
    },
    updateComment:function(newText,i){
      console.log("Updating..."+i);
        var arr=this.state.comments;
        arr[i]=newText;
        this.setState({comments:arr});
    },
    
    render:function(){
        return(
        <div className="board">
            {
            this.state.comments.map(this.eachComment)
        }
        </div>
        );
    }
    
})
var Comment=React.createClass({
    
getInitialState:function(){return {editing:false}},
    
edit:function(){ this.setState({editing:true}); },
    
rem:function(){ this.setState({editing:false}); 
                this.props.deleteFromBoard(this.props.index);
              },

save:function(){var val=this.refs.newText.value;
                console.log("New Comments"+val);
                this.props.updateCommentText(val,this.props.index);
                this.setState({editing:false});
               },


renderNormal: function(){
    return (
            <div className="commentContainer">
            <div  className="comment" >{this.props.children}</div>
            <button className="btn btn-primary" onClick={this.edit}>Edit</button>
            <button className="btn btn-warning" onClick={this.rem}>Delete</button>
            </div>
        
        );
},
    
renderForm:function(){
return(
    <div className="commentContainer">
        <textarea ref="newText" defaultValue={this.props.children}></textarea>
        <button className="btn btn-success" onClick={this.save}>Save</button>
    </div>
);
},

render:function(){
     if(this.state.editing){
         return this.renderForm();
     }
    else{
        return this.renderNormal();
    }
    }
})
//rendering the component

 
/*var indents = [];               
 for (var i = 1; i <= 3; i++) {
  indents.push(<Comment id={i}/>);
               console.log(i);
}
   */             
ReactDOM.render(<div><Board/> </div>,app);