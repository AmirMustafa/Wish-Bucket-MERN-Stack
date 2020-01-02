import React, { Component } from "react";

class Home extends Component {
  state = {
    text: "",
    mywishes: [{ _id: 1, wish: "loading" }] // some dummy data prev set
  };

  handleDelete = id => {
    fetch("/remove/" + id, { method: "delete" }) // React JS delete request
      .then(res => res.json())
      .then(res => {
        const newwishes = this.state.mywishes.filter(item => {
          return item._id !== id; // return id which is not equal to passed id
        });

        console.log(newwishes);
        this.setState({ mywishes: newwishes });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const url = "http://localhost:5000/sent-data"; // Node JS Server route (check route.js)
    let usp = new URLSearchParams();

    console.log(e.target);
    for (const pair of new FormData(e.target)) {
      usp.append(pair[0], pair[1]);
    }

    // proxy is written in Client's package js which target's node
    // now this will target nodejs (i.e. localhost:5000) instead of localhost:3000 (i.e. React JS)
    fetch("/sent-data", {
      method: "post",
      body: usp
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          mywishes: [...this.state.mywishes, res]
        });
      });
  };

  componentDidMount() {
    // for inserting
    fetch("/data") // this hit's node js data route)
      .then(res => res.json())
      .then(res => {
        this.setState({
          mywishes: res
        });
      });
  }

  render() {
    const list = this.state.mywishes.map(item => {
      return (
        <a
          className="collection-item"
          key={item._id}
          onClick={() => this.handleDelete(item._id)}
        >
          {item.wish}
        </a>
      );
    });

    return (
      <div className="row">
        <h4>React Form</h4>
        <form onSubmit={e => this.handleSubmit(e)} className="col s12">
          <input type="text" name="item" />
          <button type="submit" className="waves-effect waves-light btn">
            Add
          </button>
        </form>

        <div className="collection">{list}</div>
      </div>
    );
  }
}

export default Home;
