import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile, updateInput } from "../../../redux/mainReducer";
import "./EditInfo.css";

class EditInfo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      userInfo,
      dobInput,
      genderInput,
      emailInput,
      phoneInput,
      firstNameInput,
      lastNameInput
    } = this.props.main;
    const { updateInput, updateProfile } = this.props;
    return (
      <div className={this.props.editClass}>
        <div className="sectionContainer">
          <h3 className="categorySelector">First Name: </h3>{" "}
          <input
            defaultValue={userInfo.first_name}
            className="nameInput"
            name="firstNameInput"
            type="text"
            placeholder="Enter First Name Here"
            onChange={e => updateInput(e)}
          />
        </div>
        <div className="sectionContainer">
          <h3 className="categorySelector">Last Name: </h3>{" "}
          <input
            defaultValue={userInfo.last_name}
            className="nameInput"
            name="lastNameInput"
            type="text"
            placeholder="Enter Last Name Here"
            onChange={e => updateInput(e)}
          />
        </div>
        <div className="sectionContainer">
          <h3 className="categorySelector">DOB: </h3>{" "}
          <input
            defaultValue={userInfo.dob}
            className="dobInput"
            name="dobInput"
            type="date"
            min="1910-01-01"
            max="2000-01-01"
            onChange={e => updateInput(e)}
          />
        </div>
        <div className="sectionContainer">
          <h3 className="categorySelector">Email: </h3>{" "}
          <input
            defaultValue={userInfo.email}
            className="emailInput"
            name="emailInput"
            type="email"
            placeholder="Enter Email Address Here"
            onChange={e => updateInput(e)}
          />
        </div>
        <div className="sectionContainer">
          <h3 className="categorySelector">Phone: </h3>{" "}
          <input
            defaultValue={userInfo.phone}
            className="phoneInput"
            name="phoneInput"
            type="text"
            placeholder="Enter Phone Number Here"
            onChange={e => updateInput(e)}
          />
        </div>
        <div className="sectionContainer">
          <h3 className="categorySelector">Gender: </h3>{" "}
          <select
            className="genderInput"
            name="genderInput"
            onChange={e => updateInput(e)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
          className="submitButton"
          onClick={() =>
            updateProfile(
              dobInput,
              emailInput,
              phoneInput,
              genderInput,
              firstNameInput,
              lastNameInput
            ).then(this.props.toggleClass())
          }
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateProfile, updateInput }
)(EditInfo);