"use client"
import { TypeAnimation } from 'react-type-animation';

function TextTyper() {
  
    return (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Hello World',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'हेलो दुनिया',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '2em', display: 'flex' }}
          repeat={Infinity}
        />
      );

}

export { TextTyper };