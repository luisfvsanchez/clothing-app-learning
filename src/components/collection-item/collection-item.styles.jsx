import styled, {css} from 'styled-components';

import CustomButton from '../custom-button/custom-button.component';

export const CustomButtonContainer = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: url(${(props) => props.imageUrl})
`;

export const CollectionItemContainer = styled.div`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover ${CustomButtonContainer} {
    opacity: 0.85;
    display: flex;
  }
`;

export const CollectionItemFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

`;

export const PriceContaier = styled.span`
  width: 10%;
`;

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

