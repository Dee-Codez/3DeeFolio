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
            1000,
            'வணக்கம் உலகம்',
            1000,
            'হ্যালো বিশ্ব',
            1000,
            'ہیلو دنیا',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '4em', display: 'flex' }}
          repeat={Infinity}
        />
      );

}

export { TextTyper };