"use client"
import { TypeAnimation } from 'react-type-animation';

function LoadingTyper() {
  
    return (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Loading Content',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'कृपया प्रतीक्षा करें',
            1000,
            'தயவுசெய்து காத்திருங்கள்',
            1000,
            'অনুগ্রহপূর্বক অপেক্ষা করুন',
            1000,
            'برائے مہربانی انتظار کریں',
            1000
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '4em', display: 'flex', fontFamily: 'neo' }}
          repeat={Infinity}
        />
      );

}

export { LoadingTyper };