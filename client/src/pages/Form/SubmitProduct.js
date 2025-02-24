import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { storage } from "../../firebase";
import cookie from "react-cookies";
import Login from './Login';

class SubmitProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      imageError: false,
      success: false,
      productName: "",
      description: "",
      price: "",
      amount: "",
      category: "textbooks",
      image: null,
      imageURL: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleImgChange = (event) => {
    // this.setState({
    //   img: URL.createObjectURL(event.target.files[0])
    // })
    if (event.target.files[0]) {
      const image = event.target.files[0];
      console.log(image);
      this.setState({
        image: image
      });
      const uploadTask = storage.ref(`listingImages/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {
        // progress function
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      },
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storage.ref('listingImages').child(`${image.name}`).getDownloadURL().then(url => {
          this.setState({
            imageURL: url
          });
          console.log(this.state.imageURL);
          console.log('url is saved');
        })
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.imageURL == ''){
      this.setState({
        imageError: true,
      })
      return false;
    }
    const header = cookie.load('token');
    
    const productData = {
      productName: this.state.productName,
      description: this.state.description,
      price: this.state.price,
      amount: this.state.amount,
      category: this.state.category,
      imageURL: this.state.imageURL,
    };

    // console.log(productData)

    fetch("/api/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${header}`
      },
      body: JSON.stringify(productData)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Product Validation");
      })
      .then(product => {
        this.setState({
          success: true
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
        console.log(err);
      });
  }

  render() {
    if (this.state.success) return <Redirect to="/" />;

    let errorMessage = null;
    if (this.state.imageError) {
      errorMessage = (
        <div className="alert alert-danger">
          "Wait for image to upload"
        </div>
      );
    }
    else if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error submiting this product."
        </div>
      );
    }
    const isAuthenticated = cookie.load("token");
  
    if(isAuthenticated) {

    return (
      <div className="col-10 col-md-8 col-lg-7" style={{backgroundColor:'white', padding:'2em 2em 2em 1em'}}>
        <h3>
          Please enter following information for submitting product to sell
        </h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Product Name"
            name="productName"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="text"
            required
            onChange={this.handleChange}
            variant="outlined"
          />
          <TextField
            label="Product Description"
            name="description"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="text"
            required
            rows="5"
            multiline
            onChange={this.handleChange}
            variant="outlined"
          />
          <TextField
            label="Price"
            name="price"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: "1" }}
            required
            onChange={this.handleChange}
            variant="outlined"
          />
          <TextField
            label="Amount"
            name="amount"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: "1" }}
            required
            onChange={this.handleChange}
            variant="outlined"
          />
          <label>
            Choose a Category
            <select name="category" value={this.state.category} onChange={this.handleChange}>
              <option disabled>Please choose one of the following</option>
              <option value="textbooks">Textbooks</option>
              <option value="class-notes">Class Notes</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="notebooks">Notebooks</option>
              <option value="arts-and-crafts">Arts and Crafts</option>
              <option value="bags">Bags</option>
              <option value="other">Others</option>
            </select>
          </label>
          <div className="form-group">
            {/* <label htmlFor="exampleFormControlFile1">Image Upload</label> */}
            <input type="file" className="form-control-file" accept="image/*" onChange={this.handleImgChange} required />
            <img className="imgUpload" src={this.state.imageURL} />
          </div>
          <Button
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="primary"
          >
            Submit Product
          </Button>
        </form>
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

export default SubmitProduct;
