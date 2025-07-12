import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import Loader from "../components/Loader"; 
import  Fox  from "../models/Fox";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="flex flex-col md:flex-row w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="w-full md:w-1/2 flex justify-start">
        <div className="flex flex-col w-full md:max-w-xl">
          <h1 className="text-blue-600 text-3xl mb-6 font-semibold">
            Get In Touch
          </h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7"
          >
            <label className="text-black-500 font-semibold">
              Name
              <input
                type="text"
                name="name"
                required
                className="input mt-3 w-full p-1.5 border-2 rounded-md"
                placeholder="John Doe"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={form.name}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Email
              <input
                type="email"
                name="email"
                required
                className="input mt-3 w-full p-1.5 border-2 rounded-md"
                placeholder="johndoe@gmail.com"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={form.email}
              />
            </label>
            <label className="text-black-500 font-semibold">
              Write your message
              <textarea
                name="message"
                required
                className="mt-3 w-full h-30 p-1.5 border-2 rounded-md"
                placeholder="Let Me Know How I Can Help You"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={form.message}
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white font-semibold w-40 py-2 rounded-md cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[350px] md:h-auto mt-8 md:mt-0">

        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;





//         <Fox currentAnimation={currentAnimation} />
//       </div>
//     </section>