import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from '../components';

// Create Component
// The data is the actual data that we want to render
// The title is the text to return if there is no data
const RenderCards = ( {data, title}) => {
  // If the length of the data is greater than 0, then map through the data and return the Card component
  if (data?.length > 0 ) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
      );
    // All properties of the post object will be passed as "key=value" pairs as separate props in this component
  }

  return (
    <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
  )
}

// -------------------------------------------- //
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [timeout, setTimeout] = useState(null)

  // Call to get all the posts
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse()); // Reverse the order of the posts
        }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffcet is always called at the start when the component is rendered
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(timeout);
    setSearchText(e.target.value);
     
    setTimeout(
      // To make sure that there is no request each time for each individual letter
      setTimeout(() => {
        // Filter the posts based on the search text
        const searchResults = allPosts.filter((post) => post.name.toLowerCase().includes(searchText.toLowerCase()) ||
        post.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResults);
      }, 500)
    );
  }


  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[400px]'>Take a glimpse into visually stunning worlds generated by DALL-E</p>
      </div>

      <div className='mt-16'>
        <FormField 
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
          />
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
              { searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards
                  data={allPosts} 
                  title="No posts found"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home