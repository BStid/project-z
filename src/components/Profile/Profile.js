import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, addImage, getOrderHistory } from "../../redux/mainReducer";
import S3Uploader from "./S3Uploader";
import StarRatings from "react-star-ratings";
import userDefaultPicture from "../Nav/pictures/userDefault.png";
import EditInfo from "./EditInfo/EditInfo";
import LoadingPage from "../LoadingPage/LoadingPage";
import DisplayHistory from "../History/DisplayHistory";
// import ProfileInfo from "./ProfileInfo";
import "./Profile.css";
import "./ProfileHistory.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      editProfileClass: "noDisplay",
      infoClass: "infoClass",
      card: "phCard",
      title: "phTitle",
      infoContainer: "phInfoContainer",
      info: "phInfo",
      addButton: "phReviewButton"
    };
    this.toggleClass = this.toggleClass.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getOrderHistory();
  }
  updateImage = imageUrl => {
    this.props
      .addImage(imageUrl)
      .then(this.setState({ image: this.props.main.image }));
  };
  toggleClass() {
    if (this.state.editProfileClass === "noDisplay") {
      this.setState({ editProfileClass: "editOuter", infoClass: "noDisplay" });
    } else {
      this.setState({ editProfileClass: "noDisplay", infoClass: "infoClass" });
    }
  }
  render() {
    const { userInfo, isLoading, orderHistory } = this.props.main;
    const { card, title, infoContainer, info, addButton } = this.state;

    let profilePicture;
    if (isLoading) {
      profilePicture = <LoadingPage />;
    } else {
      profilePicture = !userInfo.image_url ? (
        <img
          src={userDefaultPicture}
          alt="default image"
          className="profileImageDefault"
        />
      ) : !this.state.image ? (
        <img
          src={userInfo.image_url}
          className="profileImage"
          alt="user profile image"
        />
      ) : (
        <img
          src={this.state.image}
          className="profileImage"
          alt="user profile image"
        />
      );
    }

    const displayShortHistory = orderHistory.map((value, index) => {
      if (index >= 4) {
        return null;
      }
      return (
        <DisplayHistory
          value={value}
          key={index}
          card={card}
          title={title}
          infoContainer={infoContainer}
          info={info}
          addButton={addButton}
        />
      );
    });
    //TODO: Fix "Profile.js" so that it will not push everything up when rendered
    return (
      <div className="profileOuter">
        <div className="profileCard">
          <div className="profileImageContainer">
            {profilePicture}
            <S3Uploader
              image_url={userInfo.image_url}
              updateImage={this.updateImage}
            />
          </div>
          <div className="profileCardText">
            {console.log(userInfo.first_name)}
            <p id="helpUploadText"> Click or Drag a Picture to Upload</p>
            <br />
            <StarRatings
              rating={userInfo.rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            {!userInfo.first_name ? (
              <h1 className="profileName">User Profile</h1>
            ) : (
              <h1 className="profileName">{userInfo.first_name}</h1>
            )}
            {!userInfo.last_name ? (
              <div />
            ) : (
              <h1 className="profileName">{userInfo.last_name}</h1>
            )}
            <h1 className="editProfileLink" onClick={() => this.toggleClass()}>
              Edit Profile Information
            </h1>
          </div>
          <div className="profileUserData">{console.log(userInfo)}</div>
          <EditInfo
            editClass={this.state.editProfileClass}
            userInfo={userInfo}
            toggleClass={this.toggleClass}
          />
          {/* <ProfileInfo infoClass={this.state.infoClass} userInfo={userInfo} /> */}
        </div>

        <div className="profileInfo">
          <div className="shortHistory">
            <h3 className="shTitle">Recent History</h3>
            <div className="displaySH">{displayShortHistory}</div>
          </div>
          <div className="reviewContainer" />
          <div className="badgeContainer" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, addImage, getOrderHistory }
)(Profile);
