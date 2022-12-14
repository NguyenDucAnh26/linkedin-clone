import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiOutlinePhotograph, HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlineArticle } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { FaEllipsisH, FaRegCommentDots } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BiHappyHeartEyes, BiReplyAll } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { connect } from "react-redux";
import { getArticlesAPI } from "../actions";
import PostModal from "./PostModal";
import UserIcon from "../assets/images/user.svg";
import Spinner from "../assets/images/spinner.svg";
import ReactPlayer from "react-player";
function Main(props) {
  const [showModal, setShowModal] = useState("close");
  useEffect(() => {
    props.getArticles();
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {props.articles.length === 0 ? (
        <p>these are no articles</p>
      ) : (
        <Container>
          <Sharebox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src={UserIcon} alt="" />
              )}
              <button
                disabled={props.loading ? true : false}
                onClick={handleClick}
              >
                start a post
              </button>
            </div>
            <div>
              <button>
                <HiOutlinePhotograph />
                <span>Photo</span>
              </button>
              <button>
                <HiOutlineVideoCamera />
                <span>Video</span>
              </button>
              <button>
                <BsCalendarEvent />
                <span>Event</span>
              </button>
              <button>
                <MdOutlineArticle />
                <span>Write article</span>
              </button>
            </div>
          </Sharebox>
          <Content>
            {props.loading && <img src={Spinner} alt="" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <button>
                      <FaEllipsisH />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.shareImg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.shareImg && (
                          <img src={article.shareImg} alt="" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <AiFillLike />
                        <BiHappyHeartEyes />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments} comments</a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <AiFillLike />
                      <span>Like</span>
                    </button>
                    <button>
                      <FaRegCommentDots />
                      <span>Comment</span>
                    </button>
                    <button>
                      <IoIosShareAlt />
                      <span>Share</span>
                    </button>
                    <button>
                      <FiSend />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0 0 0 / 20%);
`;
const Sharebox = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #958b7b;
  margin: 0 0 8px;
  background-color: white;
  div {
    button {
      font-size: 16px;
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      line-height: 1.5;
      min-height: 48px;
      max-height: 60px;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: 600;

      svg {
        font-size: 24px;
        color: #6262f3;
      }
    }
    img {
      width: 48px;
      border-radius: 50%;
      margin-right: 8px;
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        span {
          color: #70b5f9;
        }
        svg {
          margin: 0 4px 0 -2px;
        }
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      button {
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.15);
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        text-align: left;
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    svg {
      color: #6262f3;
      font-size: 16px;
    }
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;
const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    border: none;
    background-color: white;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #6262f3;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.artices,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
