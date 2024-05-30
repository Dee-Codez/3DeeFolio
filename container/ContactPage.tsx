"use client"
import { useRef,useEffect,useState,forwardRef,useLayoutEffect, ForwardedRef } from 'react';
import { gsap } from 'gsap';
import { IoSend } from "react-icons/io5";
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import Link from 'next/link';
import Image from 'next/image';
import { ModernImage } from '@/components/ModernImage';

const ContactPage = forwardRef((props, ref:ForwardedRef<HTMLDivElement>) => {

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

    useLayoutEffect(() => {
        if ('current' in ref && ref.current) {
            gsap.to(ref.current, {
              backgroundPosition: '+200% 0',
              repeat: -1,
              duration: 10,
            });
        }
    }, []);
    

  return (
    <div ref={ref} style={{ backgroundSize: '200% 100%'}} className="relative transition bg-gradient-to-r dark:from-[#00032a] from-slate-200 dark:via-[#00043f] via-slate-400 dark:to-[#00032a] to-slate-200 w-full min-h-[100vh] font-neo">
        <div className="flex flex-col items-center mt-20 mb-28">
            <h1 className="text-7xl text-center">Contact Me</h1>
            <div className='mt-20 flex items-center'>
                <p className="text-2xl">My Socials : </p>
                <Link href="https://www.linkedin.com/in/debampati/" target='_blank'><ModernImage txtcn='text-md' src="/icons/linkedin.png" width={70} height={70} alt='LinkedIn' /></Link>
                <Link href="https://www.instagram.com/___debs____/" target='_blank'><ModernImage txtcn='text-md' src="/icons/ig.webp" width={70} height={70} alt='Instagram' /></Link>
                <Link href="https://wa.me/919454315004" target='_blank'><ModernImage txtcn='text-md' src="/icons/whatsapp.webp" width={70} height={70} alt='Whatsapp' /></Link>

            </div>
            {!isSubmitted ? (
                <>
                    <form className='flex flex-col gap-8 mt-20 py-6 px-10 w-[90vw] xl:w-[40vw] bg-black/10 dark:bg-white/10 text-xl rounded-xl '>
                    <p ref={errRef} className={`bg-red-500 p-1 pl-2 font-bold ${isError?`inline`:`hidden`}`}>t</p>
                    <div className='flex flex-col xl:flex-row gap-5 w-full justify-between '>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">First Name * </label>
                            <input ref={fnameRef} type="text" id="fname" name="fname" className='w-fit bg-black/20 dark:bg-white/20 rounded h-8  font-aliensub px-2' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="name">Last Name </label>
                            <input ref={lnameRef} type="text" id="lname" name="lname" className='w-fit bg-black/20 dark:bg-white/20 rounded h-8  font-aliensub px-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">Email ID * </label>
                        <input ref={mailRef} type="text" id="mail" name="mail" className=' bg-black/20 dark:bg-white/20 rounded h-8 font-aliensub px-2' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="name">How Can I Help you ? *</label>
                        <textarea onInput={autoResize} ref={messageRef} id="mail" name="mail" className=' bg-black/20 dark:bg-white/20 rounded font-aliensub px-2' />
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
                <div className='h-[20vh] mt-40 w-[90vw] xl:w-[40vw]  flex items-center justify-center text-2xl  '>
                    <p className='bg-white/10 py-6 px-10 rounded'>Information Sent Succesfully!!</p>
                </div>
                </>
            )}
            
        </div>
        <p className='absolute text-center w-full pb-5 bottom-0 font-neo text-xl'>Made With <span className='text-red-500 text-2xl'>♥</span> by Debam</p>
    </div>
  )
})

ContactPage.displayName = "ContactPage";

export { ContactPage };