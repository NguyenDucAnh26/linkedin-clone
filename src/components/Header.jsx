import styled from "styled-components";
import React from "react";
import HomeLogo from "../assets/images/home-logo.svg";
import SearchIconSvg from "../assets/images/search-icon.svg";
import HomeNavSvg from "../assets/images/nav-home.svg";
import NotificationNavSvg from "../assets/images/nav-notifications.svg";
import WorkNavSvg from "../assets/images/nav-work.svg";
import UserSvg from "../assets/images/user.svg";
import DropdownSvg from "../assets/images/down-icon.svg";
import NetworkNavSvg from "../assets/images/nav-network.svg";
import JobsNavSvg from "../assets/images/nav-jobs.svg";
import MessagingNavSvg from "../assets/images/nav-messaging.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOutAPI } from "../actions";
function Header(props) {
  return (
    <Container>
      <Content>
        <Logo>
          <Link to="/ home">
            <img src={HomeLogo} alt="HomeLogo" />
          </Link>
        </Logo>
        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
            <img src={SearchIconSvg} alt="Search" />
          </SearchIcon>
        </Search>
        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a href="/">
                <img src={HomeNavSvg} alt="navhome" />
                <span>Home</span>
              </a>
            </NavList>
            <NavList>
              <a href="/">
                <img src={NetworkNavSvg} alt="navhome" />
                <span>My Network</span>
              </a>
            </NavList>
            <NavList>
              <a href="/">
                <img src={JobsNavSvg} alt="navhome" />
                <span>Jobs</span>
              </a>
            </NavList>
            <NavList>
              <a href="/">
                <img src={MessagingNavSvg} alt="navhome" />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a href="/">
                <img src={NotificationNavSvg} alt="navhome" />
                <span>Notification</span>
              </a>
            </NavList>
            <User>
              <a>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="usersvg" />
                ) : (
                  <img src={UserSvg} alt="usersvg" />
                )}
                <span>Me</span>
                <img src={DropdownSvg} alt="down" />
              </a>
              <SignOut onClick={() => props.signOut()}>
                <a>Sign Out</a>
              </SignOut>
            </User>
            <Work>
              <a>
                <img src={WorkNavSvg} alt="work" />
                <span>
                  Work
                  <img src={DropdownSvg} alt="down" />
                </span>
              </a>
            </Work>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;
const Logo = styled.div`
  margin-right: 10px;
  a {
    display: flex;
  }
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;
const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.15s;
`;
const Nav = styled.div`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    width: 100%;
  }
`;
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;
const NavList = styled.li`
  position: relative;

  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    text-decoration: none;
    span {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.6);
    }
    @media (max-width: 768px) {
      min-width: 70px;
    }
  }
  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;
const SignOut = styled.div`
  position: absolute;
  cursor: pointer;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100%;
  height: 40px;
  font-size: 16px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;
const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  span {
    display: flex;
    align-items: center;
  }
  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
