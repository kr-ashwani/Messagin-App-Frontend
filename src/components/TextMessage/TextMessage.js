import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./TextMessage.css";
import { useAuth } from "../../context/AuthContext";
import dateFormat from "dateformat";

const TextMessage = ({ message }) => {
  const { currentUser } = useAuth();
  const extraInfo = message.type === "information" ? true : false;
  const messageOfUserItself =
    message.userId === currentUser.userId ? true : false;
  const userMessageClass = messageOfUserItself ? "userMessage" : "";

  return !extraInfo ? (
    <div className={`messageBox ${userMessageClass}`}>
      <div className={`msgText ${userMessageClass}`}> {message.message}</div>
      <div className={`msgSenderInfo ${userMessageClass} `}>
        {message.showUserInfo ? (
          messageOfUserItself ? (
            <>
              <div className="msgTimestamp">
                {dateFormat(new Date(message.timestamp), "h:MM TT")}
              </div>
              <div className="msgSenderName">You</div>
              <UserAvatar imgSrc={`${message.userImage}`} size="20px" />
            </>
          ) : (
            <>
              <UserAvatar imgSrc={`${message.userImage}`} size="20px" />
              <div className="msgSenderName">{message.userName}</div>
              <div className="msgTimestamp">
                {dateFormat(new Date(message.timestamp), "h:MM TT")}
              </div>
            </>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div className="extraInfo">
      <p>
        {message.userInfo.userName.length >= 20
          ? message.userInfo.userName.slice(0, 20) + "..."
          : message.userInfo.userName}{" "}
        has joined.
      </p>
    </div>
  );
};

export default TextMessage;
