// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { Stars } from "@react-three/drei";
// import { TorusKnot } from "@react-three/drei";

// const ContactPage = () => {
//   return (
//     <div
//       style={{
//         position: "relative",
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #2c3e50, #34495e)",
//         color: "#ecf0f1",
//         display: "flex",
//         flexDirection: "column",
//       }}>
      
//       <Canvas
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: -1,
//         }}
//         camera={{ position: [0, 0, 10], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <Stars
//           radius={100}
//           depth={50}
//           count={5000}
//           factor={4}
//           saturation={0}
//           fade
//         />
//         <TorusKnot args={[1, 0.4, 100, 16]} rotation={[0, 0, Math.PI / 4]}>
//           <meshStandardMaterial color="#1abc9c" />
//         </TorusKnot>
//       </Canvas>

      
//       <header
//         style={{
//           backgroundColor: "#34495e",
//           color: "#ecf0f1",
//           padding: "20px",
//           textAlign: "center",
//           zIndex: 1,
//           fontSize:"30px",
//           fontWeight:"bold"
//         }}>
//         <h1>Contact Us</h1>
//       </header>

//       <main
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: "20px",
//           zIndex: 1,
//         }}>
//         <div
//           style={{
//             display: "flex",
//             maxWidth: "1200px",
//             width: "100%",
//             borderRadius: "8px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
//             overflow: "hidden",
//             backgroundColor: "#2c3e50",
//             marginBottom: "30px",
//           }}>
          
//           <div
//             style={{
//               flex: 1,
//               padding: "30px",
//               borderRight: "1px solid #34495e",
//             }}>
//             <h2 style={{ color: "#ecf0f1" }}>Contact Information</h2>
//             <div style={{ marginBottom: "20px" }}>
//               <h3>Address</h3>
//               <p>1234 Street Name, City, Country</p>
//             </div>
//             <div style={{ marginBottom: "20px" }}>
//               <h3>Phone</h3>
//               <p>(123) 456-7890</p>
//             </div>
//             <div>
//               <h3>Email</h3>
//               <p>
//                 <a
//                   href="mailto:support@example.com"
//                   style={{ color: "#1abc9c" }}>
//                   support@example.com
//                 </a>
//               </p>
//             </div>
//           </div>

          
//           <div
//             style={{
//               flex: 1,
//               padding: "30px",
//             }}>
//             <h2 style={{ color: "#ecf0f1" }}>Send Us a Message</h2>
//             <form>
//               <div style={{ marginBottom: "15px" }}>
//                 <label
//                   htmlFor="name"
//                   style={{ display: "block", marginBottom: "5px" }}>
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #34495e",
//                     backgroundColor: "#34495e",
//                     color: "#ecf0f1",
//                   }}
//                   required
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label
//                   htmlFor="email"
//                   style={{ display: "block", marginBottom: "5px" }}>
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #34495e",
//                     backgroundColor: "#34495e",
//                     color: "#ecf0f1",
//                   }}
//                   required
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label
//                   htmlFor="subject"
//                   style={{ display: "block", marginBottom: "5px" }}>
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #34495e",
//                     backgroundColor: "#34495e",
//                     color: "#ecf0f1",
//                   }}
//                   required
//                 />
//               </div>
//               <div style={{ marginBottom: "15px" }}>
//                 <label
//                   htmlFor="message"
//                   style={{ display: "block", marginBottom: "5px" }}>
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows="4"
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     border: "1px solid #34495e",
//                     backgroundColor: "#34495e",
//                     color: "#ecf0f1",
//                   }}
//                   required></textarea>
//               </div>
//               <div>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: "10px 20px",
//                     borderRadius: "4px",
//                     border: "none",
//                     backgroundColor: "#1abc9c",
//                     color: "#fff",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                   }}>
//                   Send
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ContactPage;



import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, TorusKnot } from "@react-three/drei";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 py-16 px-8">
      {/* Go to Dashboard Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          back to home
        </Link>
      </div>

      {/* 3D Background */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <TorusKnot args={[1, 0.4, 100, 16]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#3498db" /> {/* Changed color to blue */}
        </TorusKnot>
      </Canvas>

      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600 tracking-wide drop-shadow-lg">
          Get in Touch with Us
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300 italic">
          We're here to help and answer any questions you might have.
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">Contact Information</h2> {/* Changed to cyan */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-400">Address</h3>
            <p className="text-gray-300">1234 Street Name, City, Country</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-400">Phone</h3>
            <p className="text-gray-300">(123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-400">Email</h3>
            <p>
              <a href="mailto:support@example.com" >
                support@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-cyan-500">Send Us a Message</h2> {/* Changed to cyan */}
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-gray-400">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-2 text-gray-400">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-cyan-500 rounded-lg text-white font-bold hover:bg-cyan-400 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
