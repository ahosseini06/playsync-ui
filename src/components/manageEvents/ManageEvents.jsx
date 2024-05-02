import React, { useEffect, useState } from "react";
import "./ManageEvents.css";
import { Portal, useDisclosure } from "@chakra-ui/react";
import {
  useGetEntitiesQuery,
  useGetNestedEntitiesQuery,
} from "../../services/playmaker";
import TournamentSelector from "../tournamentSelector/TournamentSelector";
import NoEvents from "../noEvents/NoEvents";
import ReactDOM from "react-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import CreateEvent from "../createEvent/CreateEvent.jsx";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Button } from "react-bootstrap";

const ManageEvents = ({ onView, onEdit, onRemove }) => {
  const { data: tournaments } = useGetEntitiesQuery({
    name: "tournaments",
    populate: "event_dates ",
  });

  console.log("tournaments", tournaments);

  const [display, setDisplay] = useState(tournaments);
  const [selectedFilter, setSelectedFilter] = useState(
    localStorage.getItem("filter") ? localStorage.getItem("filter") : "ALL"
  );

  const [loading, setLoading] = useState(false);

  // new tournament creation state variables

  const createTournament = async () => {
    setLoading(true);
    // push all varialables to back end
    // create all relations in back end
    setLoading(false);
  };

  // modal functions
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (tournaments) {
      if (selectedFilter === "ALL") {
        setDisplay(tournaments);
      } else if (selectedFilter === "SCHEDULED") {
        setDisplay({
          data: tournaments.data.filter(
            (t) => t.attributes.status === "scheduled"
          ),
        });
      } else if (selectedFilter === "ACTIVE") {
        setDisplay({
          data: tournaments.data.filter(
            (t) => t.attributes.status === "active"
          ),
        });
      } else if (selectedFilter === "COMPLETE") {
        setDisplay({
          data: tournaments.data.filter(
            (t) => t.attributes.status === "complete"
          ),
        });
      }
    }
  }, [selectedFilter, tournaments]);

  const swtichFilters = (filter) => {
    setSelectedFilter(filter);
    localStorage.setItem("filter", filter);
  };

  return (
    <>
      {/*modal*/}
      <Modal
        isCentered
        motionPreset="slideInRight"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={"xxl"}
        onClose={onClose}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent
          style={{
            backgroundColor: "#D1C4E9",
            width: "800px",
            borderRadius: "25px",
          }}
        >
          <ModalHeader className="modal-header">
            <div className="modal-title">Create New Event</div>
          </ModalHeader>
          <ModalBody
            style={{
              padding: "0",
              backgroundColor: "#231446",
              borderTopRightRadius: "0",
              borderBottomRightRadius: "25px",
              borderBottomLeftRadius: "25px",
            }}
          >
            <CreateEvent onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className="tab-page" id="manage-events">
        {tournaments &&
        tournaments.data.filter((t) => t.attributes.status !== "FINISHED")
          .length === 0 ? (
          <NoEvents onBtnClick={onOpen}></NoEvents>
        ) : (
          <div className="list-container">
            <div className="filter-switcher">
              <button
                className={`filter${
                  selectedFilter === "ALL" ? "-selected" : ""
                }`}
                onClick={() => swtichFilters("ALL")}
              >
                All
              </button>
              <button
                className={`filter${
                  selectedFilter === "SCHEDULED" ? "-selected" : ""
                }`}
                onClick={() => swtichFilters("SCHEDULED")}
              >
                Scheduled
              </button>
              <button
                className={`filter${
                  selectedFilter === "ACTIVE" ? "-selected" : ""
                }`}
                onClick={() => swtichFilters("ACTIVE")}
              >
                Active
              </button>

              <button
                className={`filter${
                  selectedFilter === "COMPLETE" ? "-selected" : ""
                }`}
                onClick={() => swtichFilters("COMPLETE")}
              >
                Complete
              </button>
              <div class="breaker"></div>
            </div>

            <TournamentSelector
              onView={onView}
              onEdit={() => null}
              tournaments={display}
            />

            <button className="btn-sized" onClick={onOpen}>
              +
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageEvents;
