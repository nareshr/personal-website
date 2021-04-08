import React from "react";
import Badge from "../elements/Badge";
import Resume from "../../resume.json";

function AboutMe() {
  return (
    <section className="section has-background-link" id="aboutMe">
      <div className="container has-text-centered">
        <figure className="image container is-180x180">
          <img
            width="180px"
            height="180px"
            src={Resume.basics.picture}
            alt={Resume.basics.name}
            className="is-rounded"
            onError={(e)=>{e.target.onerror = null; e.target.src=Resume.basics.x_pictureFallback}}
          />
        </figure>
        <p className="subtitle is-4 has-text-white has-text-weight-bold">
          {Resume.basics.x_title}
        </p>
        <p className="subtitle is-5 has-text-white has-text-weight-light summary-text">
          {Resume.basics.summary}
        </p>
        <div className="container interests">
          <div className="field is-grouped is-grouped-multiline has-text-centered">
            {Resume.interests.map((value, index) => {
              return (
                <Badge key={index} text={value.name} faIcon={value.x_icon} />
              );
            })}
          </div>
        </div>
        <div className="is-divider"></div>
              <div className="columns about-links">
                <div className="column">&nbsp;</div>
                <div className="column has-text-white">
                  <p className="heading call-me">
                    <strong style={{fontSize: "15px", fontWeight: "800"}}>Give me a ring</strong>
                  </p>
                  <p className="subheading has-text-white">
                  <a href="tel:+918690593232" className="has-text-white" style={{fontSize: "15px", fontWeight: "800"}}>+91 8690593232</a>
                  </p>
                </div>
                <div className="column">
                  <p className="heading has-text-white">
                    <strong style={{fontSize: "15px", fontWeight: "800"}}>Email Me</strong>
                  </p>
                  <p className="subheading has-text-white email-me">
                  <a href="mailto:naresh.thenaresh@gmail.com?subject=I’d love to hear from you!" className="is-unselectable has-text-white" style={{fontSize: "15px", fontWeight: "800"}}>naresh.thenaresh@gmail.com</a>
                  </p>
                </div>
                <div className="column">&nbsp;</div>
              </div>
      </div>
    </section>
  );
}

export default AboutMe;
