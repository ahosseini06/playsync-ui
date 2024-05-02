import React, { useState } from "react";
import "./SideBar.css";
import Logo from "./assets/logo-text.svg";
import LogoSmall from "./assets/logo-P.png";
import { MdOutlineManageSearch } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { CSSTransition } from "react-transition-group";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const SideBar = ({ tab, setTab, onLogout }) => {
  const [isOpened, setIsOpened] = useState(true);

  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={isOpened ? "sidebar" : "sidebar closed"}>
      {isOpened ? (
        <>
          <div className="sidebar-header">
            <img
              style={{ width: "150px", margin: "1rem" }}
              src={Logo}
              alt="logo"
            ></img>
          </div>

          <div className="sidebar-content">
            <div className="sidebar-category">
              <p className="sidebar-label">Events</p>
              <div
                className={
                  tab === "manage-events" ? "nav-item-selected" : "nav-item"
                }
                onClick={() => {
                  setTab("manage-events");
                  console.log("tab", tab);
                }}
              >
                <MdOutlineManageSearch id="nav-icon" />
                <p className="nav-name" onClick={() => setTab("manage-events")}>
                  Manage Events
                </p>
              </div>
              <div
                className={
                  tab === "event-dashboard" ? "nav-item-selected" : "nav-item"
                }
                onClick={() => setTab("event-dashboard")}
              >
                <RxDashboard id="nav-icon" />
                <p className="nav-name" onClick={() => setTab("manage-events")}>
                  Event Dashboard
                </p>
              </div>
            </div>
            <div className="sidebar-category-bottom">
              <p className="sidebar-label">Account</p>

              <div
                className={tab === "profile" ? "nav-item-selected" : "nav-item"}
                onClick={() => setTab("profile")}
              >
                <CgProfile id="nav-icon" />
                <p className="nav-name">Profile</p>
              </div>

              <div
                className={tab === "payment" ? "nav-item-selected" : "nav-item"}
                onClick={() => setTab("payment")}
              >
                <MdPayment id="nav-icon" />
                <p className="nav-name">Billing and Payment</p>
              </div>

              <div className="nav-item" onClick={onLogout}>
                <HiOutlineLogout id="nav-icon" />
                <p className="nav-name">Logout</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar-header">
            <img
              style={{ width: "15px", margin: "1rem" }}
              src={LogoSmall}
              alt="logo"
            ></img>
          </div>

          <div className="sidebar-content">
            <div className="sidebar-category">
              <div
                className={
                  tab === "manage-events"
                    ? "nav-item-selected closed"
                    : "nav-item closed"
                }
                onClick={() => {
                  setTab("manage-events");
                  console.log("tab", tab);
                }}
              >
                <MdOutlineManageSearch id="nav-icon-closed" />
              </div>
              <div
                className={
                  tab === "event-dashboard"
                    ? "nav-item-selected closed"
                    : "nav-item closed"
                }
                onClick={() => setTab("event-dashboard")}
              >
                <RxDashboard id="nav-icon-closed" />
              </div>
            </div>
            <div className="sidebar-category-bottom">
              <div
                className={
                  tab === "profile"
                    ? "nav-item-selected closed"
                    : "nav-item closed"
                }
                onClick={() => setTab("profile")}
              >
                <CgProfile id="nav-icon-closed" />
              </div>

              <div
                className={
                  tab === "payment"
                    ? "nav-item-selected closed"
                    : "nav-item closed"
                }
                onClick={() => setTab("payment")}
              >
                <MdPayment id="nav-icon-closed" />
              </div>

              <div className="nav-item closed" onClick={onLogout}>
                <HiOutlineLogout id="nav-icon-closed" />
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={isOpened ? "arrow" : "arrow closed"}
        onClick={toggleSidebar}
      >
        {isOpened ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </div>
    </div>
  );
};

export default SideBar;
