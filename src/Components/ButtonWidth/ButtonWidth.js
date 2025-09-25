import styled from "styled-components";

const ButtonContainer = styled.button`
  width: 100%;
  height: 6vh;
  background-color: #14a05c;
  border: none;
  font-size: 25px;
  color: #f1f1f1;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #128d51;
    font-size: 27px;
  }
`;

function ButtonWidth(props) {
  return (
    <ButtonContainer>{props.texto}</ButtonContainer>
  );
}

export default ButtonWidth;