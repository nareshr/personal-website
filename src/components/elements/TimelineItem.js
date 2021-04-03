import React from "react";

function TimelineItem(props) {
  return (
    <div className="timeline-item is-success">
      <div className="timeline-marker is-image is-32x32">
        <img src="" alt="" />
      </div>
      <div className="timeline-content">
        <p className="heading">{props.date}</p>
        <h1 className="title is-4"><a href={props.website} target="_blank" rel="noopener noreferrer">{props.company}</a></h1>
        <p style={{ maxWidth: "25em" }}>{props.summary}</p>
      </div>
    </div>
  );
}

export default TimelineItem;
