import React from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

export default function AccordionAlwaysOpen() {
  const [open, setOpen] = React.useState(0);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="mt-4 ml-[420px] ">
        <Accordion open={alwaysOpen}>
          <AccordionHeader onClick={handleAlwaysOpen}>Tailwindcss</AccordionHeader>
          <AccordionBody>
            Rapidly build modern websites without ever leaving your HTML.
            <br />
            <a href="https://tailwindcss.com/"> https://tailwindcss.com</a>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>Material Tailwind</AccordionHeader>
          <AccordionBody>
            Material Tailwind is an open-source library that uses the power of Tailwind CSS and React to help you build unique web projects faster and easier. The stunning design inspired by Material Design is a bonus!
            <br />
            <a href="https://www.material-tailwind.com/"> https://www.material-tailwind.com</a>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>Web Dev Simplified</AccordionHeader>
          <AccordionBody>
            Web Dev Simplified is all about teaching web development skills and techniques in an efficient and practical manner. If you are just getting started in web development Web Dev Simplified has all the tools you need to learn the
            newest and most popular technologies to convert you from a no stack to full stack developer. Web Dev Simplified also deep dives into advanced topics using the latest best practices for you seasoned web developers.
            <br />
            <a href="https://www.youtube.com/@WebDevSimplified/"> https://www.youtube.com/@WebDevSimplified</a>
          </AccordionBody>
        </Accordion>
      </div>
    </>
  );
}
