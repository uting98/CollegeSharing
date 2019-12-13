import React from 'react';
//import Post from '../components/Post';
import Loading from '../components/Loading';
import Product from '../components/Product';
import cookie from 'react-cookies';
import Login from './Form/Login';

class PostsListPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      content: '',
      loading: true,
      isChecked:false,
      schoolName: 'default',
    }
    this.handleChecked = this.handleChecked.bind(this);
  }

  async componentDidMount() {
    console.log("component mount");
    
    //fetch school name
    await fetch("/api/users/school/"+cookie.load('username'))
      .then(res => res.json())
      .then(prod => {
        this.setState({
          schoolName:prod[0].school
        },
        console.log("state saved"));
      })
      .catch(err => console.log("API ERROR: " , err));

      //then get the products
      this.getProducts();
  }

  //fetch only the prodcuts from the current user's school
  getProducts = (ev) =>{
    fetch("/api/products/school/"+this.state.schoolName)
      .then(res => res.json())

      .then(prod => {
        this.setState({
          loading: false,
          products: prod.map((p,ii) => <Product {...p} key={ii} />),
        },
        console.log("state saved"));

      })

      .catch(err => console.log("API ERROR: " , err));
  }

  //fetch data when textbar's content is changed
  contentChanged = (event) => {
    
    console.log('PREESED ' + this.state.content);
    this.setState({
      content: event.target.value,
    }, () => {
      //if text bar is empty fetch all school products
      if(this.state.content===""){
        this.getProducts();
      }
      else{
        //other wise filter school products by textbar content
        fetch("/api/products/search/"+this.state.schoolName+"/"+this.state.content)
          
        .then(res => res.json())

        .then(prod => {
          console.log(this.state.content+"content over here");
          this.setState({
            loading: false,
            products: prod.map((p,ii) => <Product {...p} key={ii} />),
          },
          console.log("state saved"));

        })

        .catch(err => console.log("API ERROR: " , err));
    }
  });

    
  }

  //fetch data when catrgory radio button is pressed
  handleChecked = ev =>{
  
    fetch("/api/products/category/"+this.state.schoolName+"/"+ev.currentTarget.value)
      .then(res => res.json())
      .then(prod => {
        this.setState({
          loading: false,
          products: prod.map((p,ii) => <Product {...p} key={ii} />),
         },
        console.log("state saved"));

      })

      .catch(err => console.log("API ERROR: " , err));
    }

  render() {
    if(this.state.loading) {
      return <Loading />;
    }
    const isAuthenticated = cookie.load("token");
    // console.log("isAuth = " + isAuthenticated);

    if(isAuthenticated) {
    return (
      
      <div style={{width:'100%', height:'100%'}}>  
      
        <div className="col-12 col-md-12 col-lg-12">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Search for a school product here" 
              value={this.state.content}
              className="form-control mr-3 rounded"
              onChange={this.contentChanged}
            />
          </div>
        <br></br>
      </div>


      <div  className='row' style={{display:'contents'}}>
          <div className='col-xs-12 col-sm-2 col-md-2 col-lg-2 filter-category justify-content-left' style={{overflow:'hidden',background:'#d1f3ff', height:'fit-content', marginRight:'0em',float:'left',textAlign:'left',
           padding:'0.1em 0.5em 0.1em 0.5em',  borderColor:'#ffb79e',borderWidth:'5px', borderStyle:'solid', marginBottom:'2em'}}>
           <strong >Catrgories:</strong>
              <br></br>
              <input type="radio" name="category" value="electronics" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Electronics 
              <br></br>
              <input type="radio" name="category" value="textbooks" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Textbooks 
              <br></br>
              <input type="radio" name="category"  value="books"  onClick={this.handleChecked}  style={{marginRight: '1em'}}/>
                Books 
              <br></br>
              <input type="radio" name="category" value="class-notes"  onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Class Notes 
              <br></br>
              <input type="radio" name="category" value="arts-and-crafts" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Arts &amp; Crafts 
              <br></br>
              <input type="radio" name="category" value="notebooks" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Notebooks 
              <br></br>
              <input type="radio" name="category" value="bags" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Bags 
              <br></br>
              <input type="radio" name="category" value="other" onClick={this.handleChecked} style={{marginRight: '1em'}}/>
                Other 
              <br></br>
              <input type="radio" name="category" value=""  onClick={this.getProducts}  style={{marginRight: '1em'}} defaultChecked/>
                Clear search filiters 
              <br></br>
          </div>
        
          <div className="col-xs-12 col-sm-10 col-md-10 col-lg-10 row justify-content-center" style={{marginLeft: '0em', paddingRight: '0em' }}>
            {this.state.products}
          </div>

        </div>
      </div>
    );
    }
    else{
      return(
        <Login />
      )
    }
  }
}

export default PostsListPage;