import React, { useState, useEffect } from "react";
import ButtonWidth from "../../Components/ButtonWidth/ButtonWidth";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styled from "styled-components";
import Cards from "./Components/Cards/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateRight } from "@fortawesome/free-solid-svg-icons";

import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  margin-left: 10vw;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #0c2d48;
  margin: 20px 0 10.5vh 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 7vw;
  row-gap: 6vh;
  justify-content: center;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.h1`
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #0c2d48;
`;

const ModalSubtitle = styled.h2`
  font-size: 28px;
  color: #09374e;
  text-decoration: underline;
  margin-bottom: 30px;
`;

const ModalList = styled.ul`
  list-style: none;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const ModalListItems = styled.li`
  display: flex;
  justify-content: space-between;
`;

const ModalItemsTitle = styled.h4`
  font-size: 25px;
`;

const ModalItemsTopic = styled.p`
  font-size: 25px;
`;

const ModalButtonsDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ModalButtons = styled.button`
  width: 25%;
  height: 7vh;
  background-color: ${(props) => props.variante === "aprovar" ? "#83da87" : "#dad384"};
  border: none;
  border-radius: 15px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    background-color: ${(props) => props.variante === "aprovar" ? "#6db66f" : "c2bb74"};
  }
`;

const ModalButtonsIcons = styled(FontAwesomeIcon)`
  font-size: 40px;
  color: #0c0c0c;
`;

function LeadsPage() {
  const [cardsData, setCardsData] = useState([]);
  const [activeTab, setActiveTab] = useState("NOVOS");
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "leads");
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCardsData(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore onSnapshot error:", err);
        setError(err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const handleCardClick = (card) => {
    if (card.status === "ANÁLISE") {
      navigate(`/analise/${card.id}`);
    } else {
      setModalData(card);
    }
  };

  const closeModal = () => setModalData(null);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const leadRef = doc(db, "leads", id);
      await updateDoc(leadRef, { status: newStatus });
      setModalData(null);
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      alert("Erro ao atualizar status. Veja o console.");
    }
  };

  const filteredCards = cardsData.filter(card => {
    const status = (card.status || "NOVOS").toUpperCase();
    return status === activeTab;
  });

  return (
    <PageContainer>
      <Sidebar activeItem={activeTab} onMenuClick={setActiveTab} />
      <Main>
        <Header>
          <ButtonWidth texto="NOVA SOLICITAÇÃO" />
        </Header>

        <Title>{activeTab}</Title>

        {loading && <p style={{textAlign:"center"}}>Carregando Leads...</p>}
        {error && <p style={{textAlign:"center", color:"red"}}>Erro ao carregar: {String(error)}</p>}

        <Grid>
          {filteredCards.length === 0 && !loading ? (
            <p style={{gridColumn: "1/-1", textAlign: "center"}}>Nenhum lead nesta aba.</p>
          ) : (
            filteredCards.map((card) => (
              <div key={card.id} onClick={() => handleCardClick(card)}>
                <Cards id={card.id} nomeSol={card.nomeSol || card.nome || "-"}/>
              </div>
            ))
          )}
        </Grid>

        {modalData && (
          <ModalBackground onClick={closeModal}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
              <ModalTitle>{modalData.id}</ModalTitle>
              <ModalSubtitle>DETALHES DO PEDIDO</ModalSubtitle>

              <ModalList>
                <ModalListItems>
                  <ModalItemsTitle>NOME:</ModalItemsTitle>
                  <ModalItemsTopic>{modalData.nomeSol || "—"}</ModalItemsTopic>
                </ModalListItems>

                <ModalListItems>
                  <ModalItemsTitle>ORIGEM:</ModalItemsTitle>
                  <ModalItemsTopic>{modalData.origem ?? "-"}</ModalItemsTopic>
                </ModalListItems>

                <ModalListItems>
                  <ModalItemsTitle>STATUS:</ModalItemsTitle>
                  <ModalItemsTopic>{modalData.status || "NOVOS"}</ModalItemsTopic>
                </ModalListItems>
              </ModalList>

              <ModalButtonsDiv>
                <ModalButtons variante="aprovar" onClick={() => handleUpdateStatus(modalData.id, "APROVADOS")}>
                  <ModalButtonsIcons icon={faCheck} />
                </ModalButtons>

                <ModalButtons variante="analise" onClick={() => handleUpdateStatus(modalData.id, "ANÁLISE")}>
                  <ModalButtonsIcons icon={faRotateRight} />
                </ModalButtons>
              </ModalButtonsDiv>
            </ModalContainer>
          </ModalBackground>
        )}
      </Main>
    </PageContainer>
  )
}

export default LeadsPage;