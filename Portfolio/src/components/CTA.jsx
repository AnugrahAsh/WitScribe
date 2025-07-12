import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className='flex justify-center items-center gap-10 md:gap-30 mt-10'>
      <p className='cta-text'>
        Have a project in mind? <br className='sm:block hidden' />
        Let’s build something together!
      </p>
      <Link to='/contact' className='text-white bg-blue-600 px-5 py-2 rounded-md'>
        Contact
      </Link>
    </section>
  );
};

export default CTA;