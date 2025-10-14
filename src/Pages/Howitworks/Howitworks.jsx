import React from 'react'
import  Classes from "../Howitworks/Howitworks.module.css";
import Header from '../../component/Header/Header';
function Howitworks() {
  return (
    <div>
      <Header />
      <div className={Classes.container}>
        <div className={Classes.Title}>
          <h1>How it works</h1>
        </div>
        <div className={Classes.SubTitle}>
          <h2>Introduction</h2>
          <p>
            Welcome to <b>EVANGADI FORUM, </b> a platform where technology
            enthusiasts connect, share, and solve problems collaboratively. Our
            forum is designed to help you find answers, contribute your
            knowledge, and engage with a community of like-minded individuals.{" "}
          </p>
          <h2>Creating an Account</h2>
          <p>
            To become a member of our community, please click the 'Sign Up'
            button located at the top right of the page. Enter your email
            address, select a username, and create a password. You will receive
            a confirmation email to activate your account.
          </p>
          <h2>Exploring Categories</h2>
          <p>Our forum is organized into various categories. These include:</p>
          <ul>
            <li>
              Categories displaying questions asked by other forum members.
            </li>
            <li>Pages with detailed views of individual questions.</li>
            <li>Areas where you can post your own questions.</li>
          </ul>
          <p>
            Use the navigation bar to access the home page and to log out from
            the forum.
          </p>
          <h2>Searching for Questions</h2>
          <p>
            If you are seeking specific questions, utilize the search bar
            located at the top right of the home page. Enter relevant keywords
            to find threads and posts that match your query.
          </p>
          <h2>Posting a Question</h2>
          <p>
            To post a new question, provide a clear and descriptive title, and
            include a detailed explanation of your question or topic. Click
            'Post' to submit your inquiry.
          </p>
          <h2>Replying to a Question </h2>
          <p>
            To respond to a question, open the specific question you are
            interested in and type your response in the text box provided. Click
            'Post Answer' to share your insights or provide a solution.
          </p>
          <h2>Community Guidelines</h2>
          <p>
            To ensure a positive experience for all members, please adhere to
            our community guidelines. Be respectful, avoid spam, and contribute
            constructively to discussions.
          </p>
          <h2>Contact and Support</h2>
          <p>
            For additional information, please visit our Evangadi Networks page
            or contact our support team via the Contact Info section located at
            the bottom of the page. <br />
            <br />
            We are here to assist you with any questions or concerns you may
            have. We are excited to have you join our community! Dive in, share
            your knowledge, and enjoy the discussions. Happy posting!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Howitworks
