import React from "react";
import { Button } from "react-bootstrap";
import Compose from "../Mail/Compose";
import { RiMailUnreadLine } from "react-icons/ri";
import {
  CDBSidebar,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link } from "react-router-dom"; // Update the import statement to "react-router-dom"

const Sidebar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Compose show={modalShow} onHide={() => setModalShow(false)} />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          float: "left",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              Compose
            </Button>
          </CDBSidebarHeader>

          <CDBSidebarMenu>
            <CDBSidebarMenuItem>
              <RiMailUnreadLine />
              <Link to="/email">IndBox</Link>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>

          <CDBSidebarFooter></CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Sidebar; // Make sure to export the Sidebar component

