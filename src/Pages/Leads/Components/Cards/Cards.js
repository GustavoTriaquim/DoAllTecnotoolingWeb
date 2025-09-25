import styled from "styled-components";

const CardContainer = styled.div`
  background-color: #6c9bbf;
  border-radius: 10px;
  width: 20vw;
  min-height: 100px;
  padding: 2% 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px #0c0c0c9d;
  }
`;

const IdText = styled.h2`
  font-size: 27px;
  font-weight: bold;
`;

const NameText = styled.h3`
  font-size: 22px;
  font-weight: normal;
`;

const CardButton = styled.button`
  width: 60%;
  height: 2.5vh;
  background-color: #f1f1f1d9;
  border: none;
  border-radius: 15px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #f1f1f1;
  }
`;

function Cards(props) {
  return (
    <CardContainer>
      <IdText>{props.id}</IdText>
      <NameText>{props.nomeSol}</NameText>
      <CardButton>
        Visualizar
      </CardButton>
    </CardContainer>
  );
}

export default Cards;