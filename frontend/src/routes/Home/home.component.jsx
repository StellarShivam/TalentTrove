import React from "react";
import { Outlet } from "react-router-dom";
import PhoneImage from "../../images/phones.png";
import Icon from "../../images/PersonalizedLearn.svg";
import InstaIcon from "../../images/instagram.svg";
import TwitterIcon from "../../images/twitter.svg";
import LinkedInIcon from "../../images/linkedin.svg";
import MicrosoftIcon from "../../images/Microsoft.svg";
import "./home.css";

const Home = () => {
  return (
    <>
      <Outlet />
      <div class="content">
        <section class="main-section">
          <div class="content-left">
            <p class="section-label">Very proud to introduce</p>
            <h1 class="section-title">
              Bridging the gap between talent and employers
            </h1>
            <p class="section-description">
              Discover endless oppotunities for professional growth and take the
              next step towards success. Join to TalentTrove today and unlock
              true potential.
            </p>
            <div class="button-group">
              <a href="/jobs" class="start-button">
                Find a Job
              </a>
            </div>
          </div>

          <div class="content-right">
            <div class="image-container">
              <img src={PhoneImage} alt="sectionImage" class="section-image" />
            </div>
          </div>
        </section>
      </div>
      <div class="feature-container">
        <div class="feature-content">
          <div class="main-info">
            <h2 class="main-title">Our competitive advantage</h2>
            <p class="main-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              enim soluta vitae asperiores numquam doloremque quis natus
              aspernatur. Fugiat, nostrum!
            </p>
          </div>

          <div class="feature-grid">
            {/* <!-- card 1 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Personalized Learning</div>
                <div class="feature-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam aperiam illo tempore.
                </div>
              </div>
            </div>
            {/* <!-- card 2 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Affordability</div>
                <div class="feature-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
                  neque nisi ex. Ad!
                </div>
              </div>
            </div>
            {/* <!-- card 3 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Industry Partnerships</div>
                <div class="feature-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate sunt quam quo deleniti sed atque quis inventore
                  porro blanditiis asperiores?
                </div>
              </div>
            </div>
            {/* <!-- card 4 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Innovative Technology</div>
                <div class="feature-description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
                  eveniet similique itaque? Aspernatur, autem blanditiis.
                </div>
              </div>
            </div>
            {/* <!-- card 5 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Responsive Support</div>
                <div class="feature-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Commodi maxime quaerat necessitatibus?
                </div>
              </div>
            </div>
            {/* <!-- card 6 --> */}
            <div class="feature-card">
              <div class="icon-container">
                <img alt="logo" class="feature-svg" src={Icon} />
              </div>
              <div class="feature-info">
                <div class="feature-title">Analytics and Insights</div>
                <div class="feature-description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veniam itaque commodi tenetur ullam corporis!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="testimonial-container">
        <div class="testimonial-content">
          <h2 class="testimonial-title">What Others Say About Us</h2>
          <div class="testimonial-grid">
            {/* <!-- card 1 --> */}
            <div class="testimonial-card">
              <div class="testimonial-text">
                “Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
                ut sed fuga!”
              </div>
              <div class="testimonial-avatar">
                <img alt="avatar" src={require("../../images/avatar1.png")} />
              </div>
              <div class="testimonial-details">
                <h3 class="testimonial-name">Sarah Johnson</h3>
                <p class="testimonial-desc">Lorem ipsum dolor sit.</p>
              </div>
            </div>
            {/* <!-- card 2 --> */}
            <div class="testimonial-card">
              <div class="testimonial-text">
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                accusantium distinctio natus!”
              </div>
              <div class="testimonial-avatar">
                <img alt="avatar" src={require("../../images/avatar2.png")} />
              </div>
              <div class="testimonial-details">
                <h3 class="testimonial-name">Sarah Johnson</h3>
                <p class="testimonial-desc">Lorem ipsum dolor sit.</p>
              </div>
            </div>
            {/* <!-- card 3 --> */}
            <div class="testimonial-card">
              <div class="testimonial-text">
                “Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                maiores reiciendis repudiandae?”
              </div>
              <div class="testimonial-avatar">
                <img alt="avatar" src={require("../../images/avatar3.png")} />
              </div>
              <div class="testimonial-details">
                <h3 class="testimonial-name">Sarah Johnson</h3>
                <p class="testimonial-desc">Lorem ipsum dolor sit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="newsletter-container">
        <div class="newsletter-content">
          {/* <!-- left part  --> */}
          <div class="news-left">
            <img
              src={require("../../images/img.png")}
              loading="lazy"
              alt="news-img"
            />
          </div>
          {/* <!-- right part --> */}
          <div class="news-right">
            <div class="news-info">
              <h2 class="news-title">Get the latest updates</h2>

              <p class="news-desc">Sign up for our newsletter</p>
            </div>

            <form class="news-form">
              <input class="news-email" placeholder="Email" />
              <button class="news-send-button">Send</button>
            </form>

            <div class="privacy-policy">
              By signing up to our newsletter you agree to our
              <a href="#service" class="news-link">
                Terms of Service
              </a>
              and
              <a href="#privacy" class="news-link">
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-container">
        <footer class="footer">
          <div class="footer-top">
            <div class="comp-logo">
              <a class="logo-link" href="#home">
                TalentTrove
              </a>
            </div>
            <p class="filler-text">Seamless Learning for Brighter Futures.</p>
            <div class="social">
              <a class="social-link" href="#instagram">
                <img alt="icon" src={InstaIcon} class="social-icon" />
              </a>
              <a href="#linkedin" class="social-link">
                <img alt="icon" src={LinkedInIcon} class="social-icon" />
              </a>
              <a href="#microsoft" class="social-link">
                <img alt="icon" src={MicrosoftIcon} class="social-icon" />
              </a>
              <a href="#twitter" class="social-link">
                <img alt="icon" src={TwitterIcon} class="social-icon" />
              </a>
            </div>
          </div>

          <div class="footer-grid">
            {/* <!-- column 1 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Products</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Customers
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- column 2 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Company</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- column 3 --> */}
            <div class="footer-grid-column">
              <div class="footer-grid-heading">Support</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Chat
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div class="footer-grid-column">
              <div class="footer-grid-heading">Legal</div>
              <ul class="footer-links-list">
                <li>
                  <a href="#overview" class="footer-link">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#overview" class="footer-link">
                    Cookie Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
        <div class="footer-copyright">
          © 2024 - Present TalentTrove. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Home;
