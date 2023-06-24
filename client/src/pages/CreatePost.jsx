import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate(); // allow us to navigate back to home page once the post is created
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [ generatingImg, setGeneratingImg ] = useState(false); // while waiting to get back the image
  const [ loading, setLoading ] = useState(false); // general loading

  const generateImage = () => {

  };

  const handleSubmit = () => {

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})
    // Here the name and the value are from the FormField component
    // This function is changing the name and value attributes of the <input> tag in the FormField
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[400px]'>Create visually stunning worlds through DALL-E</p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          {/* Remember that here handleChange is passed down to the coponent! */}
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Stacie Smith"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe} 
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              >
              </img>
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              >
              </img>
              
            )}

            {/* If we are generating the image, show a loader */}
            { generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rouinded-md text-sm w-full sm"w-auto px-5 py-2.5 text-center'
          >
            { generatingImg ? 'Generating...' : 'Generate' }
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Sharing...' : 'Share with the community'}


          </button>
          
        </div>
      </form>
    </section>
  )
}

export default CreatePost