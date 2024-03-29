import React,{useState,useEffect} from 'react'
import { Loader, Card, FormField } from '../components';

const RenderCards= ({data, title, onDelete})=>{
  if(data?.length >0) {
    console.log("data",data)
    return data.map((post)=><Card key={post.id} {...post} onDelete={onDelete}/>)
  }
  return(
    <h2 className='mt-5 font-bold text-[#6449ff]
      text-x1 uppercase'>{title}</h2>
  )
}


const Home = () => {
  const [loading, setLoading]= useState(false);
  const [allPosts, setAllPosts]= useState(null);
  const [searchText, setSearchText]= useState('');
  const [searchedResults, setSearchedResults]= useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null)

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`https://dall-e-ed3.onrender.com/api/v1/post/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // If deletion was successful, update the allPosts state to reflect the deletion
        setAllPosts(prevPosts => prevPosts.filter(post => post._id !== _id));
      } else {
        console.error('Failed to delete post:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  

  useEffect(()=>{
    const fetchPosts= async()=>{
      setLoading(true);
      
      try{
        const response= await fetch('https://dall-e-ed3.onrender.com/api/v1/post',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
          },
        })
        if(response.ok){
          const result= await response.json();
          setAllPosts(result.data.reverse());
        }
        else{
          console.log(response)
        }
      } catch (error){
        alert(error)
      } finally{
        setLoading(false)
      }
    }
    fetchPosts();
  },[]);

  const handleSearchChange= (e)=>{
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);
    
    setSearchTimeout(
    setTimeout(()=>{
      const searchResults= allPosts.filter((item)=>item.name.
      toLowerCase().includes(searchText.toLowerCase()) || item.prompt.
      toLowerCase().includes(searchText.toLowerCase()));    

      setSearchedResults(searchResults);
    }, 500)
    );
  }
  return (
    <section className='max-w-7xl mx-auto'>
    <div>
      <h1 className='font-extrabold text-[#222328] text-[30px]'>
        The Comunity Showcase
      </h1>
      <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
        Browse through a collection of imaginative and
        visually stunning images generated by DALL-E AI
      </p>
    </div>
    
    <div className='mt-16'>
      <FormField 
        LabelName='Search posts' 
        type='text' 
        name='text'
        placeholder='Search posts'
        value={searchText}
        handleChange={handleSearchChange}
        />
    </div>

    <div className='mt-10'>
      {loading? (
        <div className='flex justify-center items-center'>
          <Loader />
        </div>
      ) : (

        <>
          {searchText && (
            <h2 className='font-medium text-[#666e75]
            text-xl mb-3'>
              Showing Results for <span className='text-[#222328]'>
              {searchText}
              </span>
            </h2>
          )}
          <div className='grid lg:grid-cols-4 sm:grid-cols-3
          xs:grid-cols-2 grid-cols-1 gap-x-3'>
             {searchText ? (
              <RenderCards 
                data={searchedResults} title='No serach results found' onDelete={handleDelete}/>
             ):(
              <RenderCards data={allPosts} title='No posts found'  onDelete={handleDelete}/>
             )}
          </div>
        </>

      )}  
    </div>
    </section>
  )
}

export default Home