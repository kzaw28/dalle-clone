import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from '../components';

// Create Component
const RenderCards = ( data, title) => {
  if (data?.length > 0 ) {
    return data.map((post) => <Card key={post.id} {...post} />)
  }
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('abc')

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[400px]'>Take a glimpse into visually stunning worlds generated by DALL-E</p>
      </div>

      <div className='mt-16'>
        <FormField />
      </div>

      <div className='mt-10'>
        { loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            { searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              <Card />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home