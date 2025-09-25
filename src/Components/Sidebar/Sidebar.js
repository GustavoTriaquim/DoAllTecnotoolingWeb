import Logo from '../../Assets/Images/DoAll-Logo.png';
import styled from 'styled-components';

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 10vw;
  height: 100vh;
  background-color: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  z-index: 999;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoImg = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #0c2d48;
  margin: 0;
  font-weight: 600;
  font-family: 'Jura', sans-serif;
  cursor: default;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  cursor: default;
`;

const MenuItem = styled.li`
  text-align: center;
  padding: 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#fff" : "#0c2d48")};
  background-color: ${(props) => (props.active ? "#0c2d48" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0c2d489d;
    color: #fff
  }
`;

function Sidebar({ activeItem, onMenuClick}) {
  const menuItems = ["NOVOS", "ANÁLISE", "APROVADOS", "REPROVADOS", "PERDIDOS"];

  return (
    <Container>
      <Header>
        <LogoImg src={Logo} alt='Logo'/>
        <Title>CRM</Title>
      </Header>
      <Menu>
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            active={activeItem === item}
            onClick={() => onMenuClick(item)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

export default Sidebar;