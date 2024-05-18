"use client"
import { useRef,useEffect,useState,forwardRef } from 'react';
import { gsap } from 'gsap';
import { IoSend } from "react-icons/io5";
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';

const ContactPage = forwardRef((props, ref) => {

    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const mailRef = useRef(null);
    const messageRef = useRef(null);

    const errRef = useRef(null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fname = fnameRef.current.value;
        const lname = lnameRef.current.value;
        const mail = mailRef.current.value;
        const message = messageRef.current.value;
        if (fname === '' || mail === '' || message === '') {
            setIsError(true);
            errRef.current.textContent = 'Please Fill the Required(*) Fields';
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }else if(!validateEmail(mail)) {
            setIsError(true);
            errRef.current.textContent = 'Invalid Email Address';
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }else{
            setIsSubmitted(true);
            console.log(fname,lname,mail,message);
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }
        
    }

    const autoResize = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };

    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, {
              backgroundPosition: '+200% 0',
              repeat: -1,
              duration: 10,
            });
        }
    }, []);
    

  return (
    <div ref={ref} style={{ backgroundImage: "linear-gradient(to left, #00032a, #00043f, #00032a)", backgroundSize: '200% 100%', width: '100vw'}} className="relative min-h-[100vh] font-neo">
        <div className="flex flex-col items-center mt-20 mb-28">
            <h1 className="text-7xl">Contact Me</h1>
            {!isSubmitted ? (
                <>
                    <form className='flex flex-col gap-8 mt-40 py-6 px-10 w-[90vw] xl:w-[40vw] bg-white/10 text-xl rounded-xl '>
                    <p ref={errRef} className={`bg-red-500 p-1 pl-2 font-bold ${isError?`inline`:`hidden`}`}>t</p>
                    <div className='flex flex-col xl:flex-row gap-5 w-full justify-between '>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">First Name * </label>
                            <input ref={fnameRef} type="text" id="fname" name="fname" className='w-fit bg-white/20 rounded h-8  font-aliensub px-2' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">Last Name </label>
                            <input ref={lnameRef} type="text" id="lname" name="lname" className='w-fit bg-white/20 rounded h-8  font-aliensub px-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">Email ID * </label>
                        <input ref={mailRef} type="text" id="mail" name="mail" className=' bg-white/20 rounded h-8 font-aliensub px-2' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">How Can I Help you ? *</label>
                        <textarea onInput={autoResize} ref={messageRef} id="mail" name="mail" className=' bg-white/20 rounded font-aliensub px-2' />
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={handleSubmit} type="submit" className="submit-button w-fit flex items-center gap-3 bg-sky-500 transition hover:bg-sky-700 font-bold py-2 px-4 rounded">
                            Send
                            <IoSend />
                        </button>
                    </div>
                </form>
            </>
            ):(
                <>
                <div className='h-[50vh] mt-40 w-[90vw] xl:w-[40vw]  flex items-center justify-center text-2xl  '>
                    <p className='bg-white/10 py-6 px-10 rounded'>Information Sent Succesfully!!</p>
                </div>
                </>
            )}
            
        </div>
        <p className='absolute text-center w-full pb-5 bottom-0 font-neo text-xl'>Made With ♡ by Debam</p>
    </div>
  )
})

ContactPage.displayName = "ContactPage";

export { ContactPage };