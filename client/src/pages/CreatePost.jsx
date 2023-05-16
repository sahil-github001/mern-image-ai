import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false);
      }
    }
    else {
      alert('Please a prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      }
      catch (error) {
        alert(err)
      }
      finally {
        setLoading(true);
      }
    }
    else {
      alert('Please enter a prompt and generate image');
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  // const handleChange2 = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto pb-[100px]'>
      <div>
        <h1 className='font-extrabold text-white text-[32px] font-sans lg:text-center'>
          Generate Image
        </h1>
        <p className='mt-2 text-white text-[16px] max-w[500px] lg:text-center'>
          Create imaginative and visually stunning images
          through ImageAI and share them with community
        </p>
      </div>
      <form className='mt-16 max-w-3xl lg:mx-auto' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5 bg-[#082b34] shadow  p-4 rounded-[10px]'>
          <FormField
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="Sahil"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A futuristic cityscape filled with neon lights and flying cars"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900
          text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 w-64 p-3 
          h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt}
                className="w-full h-full object-contain" />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-9/12
              object-contain opacity-40'/>
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex rounded-lg
              justify-center items-center bg-[rgba(0,0,0,0.5)]'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5 '>
          <button type='button' onClick={generateImage}
            className="text-white bg-[#163c47] hover:bg-[#256373] transition
              font-meduim rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center">
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#2e7c91] text-[14px]'>Once you created the image you want, you can share it with others in
            the community
          </p>
          <button type='submit' className='mt-3 text-white bg-[#49aac5] font-meduim
          rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center' >
            {loading ? 'Sharing...' : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost