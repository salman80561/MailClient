import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const InboxPage = () => {
  const [data, setData] = useState([]);

  const email = localStorage.getItem("email");
  const mail = email.replace(/[@.]/g, "");

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://mailbox-6eb1c-default-rtdb.firebaseio.com/${mail}sentMailbox.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages.");
      }
      const responseData = await response.json();
      const messages = Object.values(responseData || {});
      setData(messages);
    } catch (error) {
      console.log(error);
    }
  }, [mail]);

  const openMessage = (emailId) => {
    console.log("Open message with emailId:", emailId);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Card bg="secondary">
        <h2 style={{ textAlign: "center" }}>Inbox</h2>
        <ListGroup>
          {data.length === 0 && <h5>Empty inbox. No messages found!</h5>}
          {data.map((message, index) => (
            <ListGroup.Item
              onClick={() => openMessage(message.emailId)}
              style={{ cursor: "pointer", backgroundColor: "darkgray" }}
              key={index}
            >
              <span>
                <b>From:</b> {message.from}
              </span>
              <br />
              <span>
                <b>Subject: </b> {message.subject}
              </span>
              <br />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  );
};

export default InboxPage;
