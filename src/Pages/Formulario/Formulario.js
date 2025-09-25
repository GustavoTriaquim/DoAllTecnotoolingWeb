import React, { useState, useEffect } from "react";
import ButtonWidth from "../../Components/ButtonWidth/ButtonWidth";
import Sidebar from "../../Components/Sidebar/Sidebar";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #0c2d48;
  margin: 20px 0 10.5vh 0;
`;

const FormWrapper = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr) auto;
  grid-gap: 15px;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  color: #0c2d48;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f9f9f9;
`;

const UploadBox = styled.div`
  grid-row: span 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #aaa;
  padding: 10px;
  border-radius: 6px;
  background: #fafafa;
`;

function FormularioPage() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    const fetchLead = async () => {
      const docRef = doc(db, "leads", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLead({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchLead();
  }, [id]);

  if (!lead) {
    return <p style={{ marginLeft: "12vw" }}>Carregando dados...</p>
  }

  return (
    <PageContainer>
      <Sidebar />
      <Main>
        <Title>NOVA SOLICITAÇÃO</Title>

        <FormWrapper>
          <div>
            <Label>Nome</Label>
            <Input value={lead.nomeSol} readOnly />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input value={lead.email} readOnly />
          </div>
          <div>
            <Label>Endereço</Label>
            <Input value={lead.endereco} readOnly />
          </div>

          <UploadBox>
            <span>Anexo</span>
            <span style={{ fontSize: "12px", marginTop: "5px" }}>
              (não implementado)
            </span>
          </UploadBox>

          <div>
            <Label>Pessoa Física?</Label>
            <Input value={lead.pessoaFisica} readOnly />
          </div>
          <div>
            <Label>CPF/CNPJ</Label>
            <Input value={lead.cpfcnpj} readOnly />
          </div>
          <div>
            <Label>Razão Social</Label>
            <Input value={lead.razaoSocial || ""} readOnly />
          </div>
        </FormWrapper>

        <Footer>
          <ButtonWidth texto="ENVIAR SOLICITAÇÃO" />
        </Footer>
      </Main>
    </PageContainer>
  )
}

export default FormularioPage;