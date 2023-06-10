import React from 'react'
import img from '../assets/nasigoreng.jpg'

const RecipeDetails = () => {
  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto recipe">
            <img src={img} alt="img" height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">Nasi Goreng</h1>
            <hr />
            <p className="lead">makanan khas indonesia</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeDetails
