import React, { useState, useEffect } from "react";
import { BsImageFill } from 'react-icons/bs';
import Lottie from "react-lottie";
import animationData from "../assets/lotties/24661-assert-architects.json";
import styles from '../ImageGenerationForm.module.css'; 
import image1 from "../assets/img/apartments/a1lg.png";
import image2 from "../assets/img/apartments/a2lg.png";
import image3 from "../assets/img/apartments/a3lg.png";


const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [openImage, setOpenImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

const images = [image1, image2, image3];

 const imageLength = images.length;

useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageLength);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clear interval on component unmount
}, [imageLength]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutputs(prevOutputs => [...prevOutputs, URL.createObjectURL(blob)]);
    setLoading(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top} style={{ backgroundImage: `url(${images[imageIndex]})` }}>
           <div className="insback justify-center  h-full md:h-3/5 sm:h-2/5 rounded-lg shadow-lg  sm:p-8 md:p-12 lg:p-16 w-full md:w-4/5 sm:w-2/5">
       <div>
       <h2 className=" text-center text-3xl font-bold tracking-tight text-orange-900">AsaanGhar AI</h2>
        <h2  className=" text-center text-2xl font-bold tracking-tight text-orange-900" >AI image generation lets you visualize what your future home could look lile</h2>
        </div>
      </div>
      </div>
      <form className={styles.genForm} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input type="text" name="input" placeholder="type your prompt here..." />
          <button type="submit"><BsImageFill /></button>
        </div>
      </form>
      {loading && 
        <div className={styles.loading}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      }
      <div className={styles.bottom}>
        {!loading && outputs && (
          <div className={styles.gridContainer}>
            {outputs.map((output, index) => (
              <div key={index} className={styles.resultImage}>
                <img src={output} alt={`Generated art ${index + 1}`} onClick={() => setOpenImage(output)} />
              </div>
            ))}
          </div>
        )}
      </div>
      {openImage && (
        <div className={styles.lightbox} onClick={() => setOpenImage(null)}>
          <img src={openImage} alt="Expanded view" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerationForm;
