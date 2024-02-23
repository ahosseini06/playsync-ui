import React, { useEffect, useState } from "react";
import "./ManageEvents.css";
import { Portal, useDisclosure } from "@chakra-ui/react";
import { useGetEntitiesQuery } from "../../services/playmaker";
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
    populate: true,
  });
  console.log("tournaments", tournaments);

  const [display, setDisplay] = useState(tournaments);
  const [selectedFilter, setSelectedFilter] = useState(
    localStorage.getItem("filter") ? localStorage.getItem("filter") : "ALL"
  );
  const [stage, setStage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // new tournament creation state variables
  // Tournament information state variables
  const [poolPlay, setPoolPlay] = useState(false);
  const [crossOver, setCrossOver] = useState(false);
  const [venues, setVenues] = useState([]);
  const [numPools, setNumPools] = useState(4);
  const [numTiers, setNumTiers] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [tournamentName, setTournamentName] = useState("");

  const [isResolved, setIsResolved] = useState(false);

  const resolveStage = (stage) => {
    console.log("venues", venues);
    console.log("selectedDates", selectedDates);
    console.log("tournamentName", tournamentName);
    if (stage === 1) {
      if (venues && selectedDates && tournamentName) {
        console.log("first stage resolved");
        return true;
      }
      console.log("first stage not resolved");
      setError(true);
      return false;
    } else if (stage === 2) {
      if (true) {
        return true;
      }
      return false;
    } else if (stage === 3) {
      if (true) {
        return true;
      }
      return false;
    }
  };
  const createTournament = async () => {
    setError(false);
    setLoading(true);
    // push all varialables to back end
    // create all relations in back end
    setLoading(false);
  };
  const nextStage = () => {
    if (!error) {
      setStage(stage + 1);
    }
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

  useEffect(() => {
    setError(!resolveStage(stage));
  }, [venues, selectedDates, tournamentName, stage, error]);

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
          <ModalBody style={{ backgroundColor: "#231446" }}>
            <CreateEvent
              stage={stage}
              poolPlay={poolPlay}
              setPoolPlay={setPoolPlay}
              crossOver={crossOver}
              setCrossOver={setCrossOver}
              venues={venues}
              setVenues={setVenues}
              numPools={numPools}
              setNumPools={setNumPools}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              tournamentName={tournamentName}
              setTournamentName={setTournamentName}
              numTiers={numTiers}
              setNumTiers={setNumTiers}
            />
          </ModalBody>

          <ModalFooter>
            <div className="m-footer">
              <button
                className="btn-secondary"
                onClick={
                  stage === 1
                    ? () => {
                        onClose();
                        setStage(1);
                      }
                    : () => {
                        setStage(stage - 1);
                      }
                }
              >
                {stage === 1 ? "Cancel" : "Back"}
              </button>

              <Popover>
                <PopoverTrigger>
                  <Button
                    className="btn-primary"
                    onClick={stage === 4 ? createTournament : nextStage}
                  >
                    {stage === 4 ? "Create Event" : "Next"}
                  </Button>
                </PopoverTrigger>
                {error && (
                  <PopoverContent
                    color="#E040FB"
                    bg="#1E113C"
                    borderColor="#1E113C"
                  >
                    <PopoverCloseButton />
                    <PopoverHeader borderColor="black">
                      Please fill out all required fields
                    </PopoverHeader>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          </ModalFooter>
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
