import React, { useState, useEffect, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Form, InputGroup } from "react-bootstrap";

function Compose(props) {
  const emailRef = useRef();
  const subRef = useRef();
  const [value, editorValue] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const senderEmail = localStorage.getItem("email");

  const onSendMail = async (e) => {
    const replacedSenderMail = senderEmail.replace(/[@.]/g, "");
    const email = emailRef.current.value;
    const subject = subRef.current.value;
    console.log(email, subject, value);

    const mailData = {
      email: email,
      subject: subject,
      message: value,
    };

    try {
      const response = await fetch(
        `https://mailbox-6eb1c-default-rtdb.firebaseio.com/${replacedSenderMail}sentMailbox.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    try {
      const mail = email.replace(/[@.]/g, "");
      const response = await fetch(
        `https://mailbox-6eb1c-default-rtdb.firebaseio.com/${mail}sentMailbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: replacedSenderMail,
            subject: subject,
            message: value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Successfully sent!");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    editorValue(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="bg-secondary varient-dark">
          <Modal.Header closeButton>
            <Modal.Title>Compose Mail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>
              <Form.Control
                required
                aria-label="Email"
                aria-describedby="inputGroup-sizing-sm"
                type="email"
                placeholder="Enter email"
                ref={emailRef}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Subject</InputGroup.Text>
              <Form.Control
                aria-label="Subject"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                ref={subRef}
              />
            </InputGroup>
            <Card>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                placeholder="Write some message"
                toolbar={{
                  inline: { inDropdown: true },
                }}
              />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onSendMail}>Send</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}

export default Compose;
