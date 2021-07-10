import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {

  // GET Product id
  const id = useParams().id;
  // Fetch the products
  const {fetchSingleProduct , single_product_loading : loading , single_product_error : error , single_product} = useProductsContext();
  // use api in useEffect
  useEffect(()=> {
    fetchSingleProduct(`${url}${id}`)
    // eslint-disable-next-line
  },[id])

  const history = useHistory();
  // Use this function to redirect to the home page "/"
  useEffect(()=> {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
    // eslint-disable-next-line
  },[error])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  const {name , images , price , id :sku ,description , stars , reviews , company , stock} = single_product
  return <Wrapper>
    <PageHero title={name} isSingleproduct />
    <section className="section-center section page" >
      <Link to="/products" className="btn" >Back to products</Link>
      <div className="product-center" >
        <ProductImages images={images} />
        <section className="content" >
          <h2> {name} </h2>
          <Stars stars ={stars} reviews={reviews} />
          <h5 className="price" > {formatPrice(price)} </h5>
          <p className="desc" > {description} </p>
          
          <p className="info" >
            <span>Avalibale :  </span> {stock > 0 ? "Invalibale" : "Out of stock" }
          </p>
          <p className="info" >
            <span>SKU : </span> {sku}
          </p>
          <p className="info" >
            <span>Brand : </span> {company}
          </p>
          <hr />
          {stock > 0 && <AddToCart product = {single_product} />}
        </section>
      </div>
    </section>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
