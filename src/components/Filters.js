import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters : {
      text,
      category,
      company,
      price,
      max_price,
      min_price,
      shipping,
      color,
      
    },
    all_products,
    updateFilters ,
    clearFilters,
    } = useFilterContext()

    const categories = getUniqueValues(all_products , "category")
    const companies = getUniqueValues(all_products , "company")
    const colors = getUniqueValues(all_products , "colors")

  return <Wrapper>
    <div className="content" >
      <form onSubmit={e => e.preventDefault()} >
        <div className="form-control" >
          <input type="search" name="text" placeholder="Search ..." className="search-input" value={text} onChange={updateFilters} />
        </div>

        <div className="form-control" >
          <h5>Category </h5>
          <div>
            {categories.map((cat , indix) => {
              return <button key={indix} onClick={updateFilters} name="category" type="button" 
                className={`${category === cat.toLowerCase() ? "active" : null}`}
              >{cat}</button>
            })}
          </div>
        </div>

        <div className="form-control" >
            <h5>Company</h5>
            <select name="company" className="company" value={company} onChange={updateFilters}  >
              {companies.map((com , indix) => {
                return <option key={indix} value={com}>{com}</option>
              })}
            </select>
        </div>

        <div className="form-control" >
          <h5>Colors</h5>
          <div className="colors" >
            {
              colors.map((clr , indix) => {
                if (clr === "all") {
                  return <button key={indix} name="color" onClick={updateFilters} data-color ="all" className={`${color === "all" ? "all-btn active" : "all-btn"}`}>all</button>
                }
                return <button key={indix} style={{backgroundColor : clr}} 
                                onClick={updateFilters}
                                data-color = {clr}
                                name="color"
                                className={clr === color ? "color-btn active" : "color-btn"}
                >{clr === color ? <FaCheck/> : null}</button>
              })
            }
          </div>
        </div>

        <div className="form-control" >
            <h5>Price</h5>
            <p className="price" > {formatPrice(price)} </p>
            <input type="range" name="price" onChange={updateFilters} min={min_price} max={max_price} value={price} />
        </div>

        <div className="form-control shipping" >
            <label htmlFor="shipping" >Free Shipping</label>
            <input type="checkbox" name="shipping" id="shipping" onChange={updateFilters} checked={shipping} />
        </div>

      </form>
      <button className="clear-btn" onClick={clearFilters} >clear filters</button>
    </div>

  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
