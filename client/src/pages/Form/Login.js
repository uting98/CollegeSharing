import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const userData = {
      
    };

    console.log(userData)

    fetch("/api/products", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw new Error("Login Validation");
      })
      .then(user => {
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
    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "Wrong Username or Password."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7">
        <h3>
          Please enter following information for submitting product to sell
        </h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
          <TextField
            label="sellerID"
            name="sellerID"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="number"
            required
            onChange={this.handleChange}
            variant="outlined"
          />
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
}

export default Login;
