"use client"

import { useRef,useEffect,useState } from 'react';
import {gsap} from 'gsap';
import { VerticalTimeline,VerticalTimelineElement} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import VisibilitySensor from 'react-visibility-sensor';

function ProjectPage() {
    
    
    const gradientRef = useRef(null);
    const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        if (gradientRef.current) {
          const componentTop = gradientRef.current.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          const offset = windowHeight * 0.25; // adjust this value to change the position of the line
          const newLineHeight = Math.max(0, windowHeight / 2 - componentTop - offset);
          setLineHeight(newLineHeight);
        }
      };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    useEffect(() => {
        gsap.to(gradientRef.current, {
            backgroundPosition: '200% 0',
            repeat: -1,
            duration: 10,
          });

    }, [])
    
  return (
    <div
      ref={gradientRef}
      style={{
        backgroundImage: 'linear-gradient(to right, #00032a, #00043f, #00032a)',
        backgroundSize: '200% 100%',
        width: '100vw',
      }}
      className="flex font-neo flex-col min-h-[500vh] items-center"
    >
      <div>
        <div className="mt-20">
          <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-7xl">Projects</h1>
            <p className="text-3xl text-center">
              Here are some of my projects in a timeline format
            </p>
            <div className='mt-20 w-[80vw] transition-all duration-200'>
                <VerticalTimeline className='font-aliensub font-bold'>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) =>
                            <VerticalTimelineElement
                                visible={isVisible}
                                className="vertical-timeline-element--work "
                                contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '20px' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                date="March 2023"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            >
                                <h3 className="vertical-timeline-element-title">Landing Page</h3>
                                <h4 className="vertical-timeline-element-subtitle"></h4>
                                <p>
                                    Started Off, Just like everyone else. Building the very first
                                    website and shipping it off to the internet. Those were the days
                                </p>
                            </VerticalTimelineElement>
                        }
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) =>
                            {
                                return <VerticalTimelineElement
                                    visible={isVisible}
                                    className="vertical-timeline-element--work "
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '20px' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="April 2022"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                >
                                    <h3 className="vertical-timeline-element-title">Basic JS Timers</h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        At this point Javascript came into my life and I migrated into it.
                                        Trying whatever I could to make the website more interactive.
                                    </p>
                                </VerticalTimelineElement>;
                            }
                        }
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) =>
                            {
                                return <VerticalTimelineElement
                                    visible={isVisible}
                                    className="vertical-timeline-element--work "
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '20px' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="April 2022"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                >
                                    <h3 className="vertical-timeline-element-title">ALgo Based ML Models</h3>
                                    <h4 className="vertical-timeline-element-subtitle"></h4>
                                    <p>
                                        With the seemingly fresh trend of ChatGPT and AI, I also 
                                        wanted to dive right into it. So I began tinkering with algorithms and data.
                                    </p>
                                </VerticalTimelineElement>;
                            }
                        }
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) =>
                            {
                                return <VerticalTimelineElement
                                    visible={isVisible}
                                    className="vertical-timeline-element--work "
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '20px' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="April 2022"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                >
                                    <h3 className="vertical-timeline-element-title text-lg">DeeSharez</h3>
                                    <h4 className="vertical-timeline-element-subtitle text-sm">React, SanityCMS</h4>
                                    <p>
                                        This was my first take at building a full stack application. Also My
                                        first time using React, GAuth, third-party CMS and much more. It was a fun experience.
                                    </p>
                                </VerticalTimelineElement>;
                            }
                        }
                    </VisibilitySensor>
                    <VisibilitySensor partialVisibility>
                        {({isVisible}) =>
                            {
                                return <VerticalTimelineElement
                                    visible={isVisible}
                                    className="vertical-timeline-element--work "
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', marginTop: '20px' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="April 2022"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                >
                                    <h3 className="vertical-timeline-element-title text-lg">DeeSharez</h3>
                                    <h4 className="vertical-timeline-element-subtitle text-sm">React, SanityCMS</h4>
                                    <p>
                                        This was my first take at building a full stack application. Also My
                                        first time using React and third-party CMS. It was a fun experience.
                                    </p>
                                </VerticalTimelineElement>;
                            }
                        }
                    </VisibilitySensor>
                </VerticalTimeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectPage };