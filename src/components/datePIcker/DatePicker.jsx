import React, { useState } from "react";
import "./DatePicker.css"; // Assuming the styles are in this file
import { FaRegCalendar } from "react-icons/fa";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";

const DatePicker = ({ selectedDates, setSelectedDates }) => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const getSelectedMonthName = () => {
    return monthsCap[selectedMonth.getMonth()];
  };

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // same array as above but all capitlized
  const monthsCap = [
    "JANUARY",
    "FEBUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const handleDateClick = (date) => {
    // adds "date":Date to selectedDates if it wasn't already in there, removes if it was.
    if (selectedDates.map((d) => d.getTime()).includes(date.getTime())) {
      setSelectedDates(
        selectedDates.filter((d) => d.getTime() !== date.getTime())
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const clearSelection = () => {
    // Function to clear selected dates
    setSelectedDates([]);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedMonth);
    if (direction === "forward") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setSelectedMonth(newDate);
  };

  const getMonthArray = (month, year) => {
    // Function that returns an Array of the days in month of a year.
    //Starting on Sunday, week days that aren't part of the month are filed with " ";
    const dateMatrix = [];
    const currentDate = new Date(`${year}/${month}/1`);
    const endDate = new Date(currentDate);
    endDate.setMonth(endDate.getMonth() + 1);

    for (let i = 0; i < currentDate.getDay(); i++) {
      // setup day of week offset
      dateMatrix.push(" ");
    }

    while (currentDate < endDate) {
      // populate dateMatrix
      const storeDate = new Date(currentDate);
      dateMatrix.push(storeDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dateMatrix);
    return dateMatrix;
  };

  return (
    <div className="date-picker">
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Alumni+Sans:wght@200;400&display=swap');
        </style>
      </head>
      <div className="input-wrapper">
        <input
          className="date-input"
          style={{ overflow: "scroll" }}
          type="text"
          placeholder="Select event date(s)"
          readOnly
          value={selectedDates
            .map((d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`)
            .join(" - ")}
        />
        <FaRegCalendar id="date-icon" />
      </div>
      <div className="date-body">
        <div className="navigation">
          <IoChevronBackSharp
            className="navigate backward"
            onClick={() => navigateMonth("backward")}
          />
          <span>
            {getSelectedMonthName() + " " + selectedMonth.getFullYear()}
          </span>
          <IoChevronForwardSharp
            className="navigate forward"
            onClick={() => navigateMonth("forward")}
          />
        </div>

        <div className="dates-grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div className="weekday" key={day}>
              {day}
            </div>
          ))}

          {getMonthArray(
            selectedMonth.getMonth() + 1,
            selectedMonth.getFullYear()
          ).map((day, index) =>
            day === " " ? (
              <button disabled></button>
            ) : (
              <button
                key={index}
                className={`date ${
                  selectedDates
                    .map((date) => date.getTime())
                    .includes(day.getTime())
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day.getDate()}
              </button>
            )
          )}
        </div>

        <div className="actions">
          <button onClick={clearSelection}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
