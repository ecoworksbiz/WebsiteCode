import React from "react";
import { Row, Col } from "react-bootstrap";
import "./TestimonialSection.css";

const Testimonials = [
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.Lorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat atLorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat atLorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat atLorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat atLorem ectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at"',
    name: "John Doe",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "Johna hex",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "Johnny Doe",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorems sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John wick",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: 'etur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John kofee",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John walker",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John carter",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John abhram",
  },
  {
    img: "https://cdn.dribbble.com/users/23622/avatars/small/1d47030251459f7f3d965d2df0b3e0af.jpg?1491254964",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
    name: "John carlo",
  },
];

const TestimonialSection = () => {
  return (
    <div className="container TestimonialRow" id="testimonial">
      <Row className="Row1">
        <Col sm={6} lg={4} className="TestimonalCol1">
          <div className="testrow1">
            <span className="heading1">
              What our <br /> Client Say
            </span>
            <br />
            <div className="heading2">See All Testimonials --></div>
          </div>
        </Col>

        {Testimonials.map((Testimonial, index) => (
          <Col className="scrolltestimonial">
            <div>
              <div className="" key={index}>
                <div className="container">
                  <p className="box sb1">{Testimonial.text}</p>
                </div>
                <p className="avatarRow">
                  <img alt="banner" src={Testimonial.img} className="avatar" />
                  <span>{Testimonial.name}</span>
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TestimonialSection;
