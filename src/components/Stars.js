import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars , reviews}) => {
  console.log(stars);

      {/* Start Stars */}
        {/* <span>
          {stars >= 1 ? <BsStarFill />: stars >= 0.5 ? <BsStarHalf /> : <BsStar /> }
        </span> */}
      {/* End of Stars */}

      const tempStars = Array.from({length : 5} , (_ , indix)=> {
        const number = indix + 0.5;
        return (
          <span key={indix}>
            {stars >= indix + 1 ? <BsStarFill />: stars >= number ? <BsStarHalf /> : <BsStar /> }
          </span>
        )
      })

  return <Wrapper>
    <div className="stars"  >
      {tempStars}
    </div>
    <div className="reviews" >
      ({reviews} custumer reviews)
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
