import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,    //appwrite's ID
    title,
    featuredImage
}) {
  // console.log("hellow");
  return (
    <>
  

    <Link to={`/post/${$id}`}>
      

<div className="card bg-base-100 w-full h-3/4 shadow-xl">
  <figure>
    <img
    className='md:w-full md:h-[300px]'
      src={appwriteService.getFilePreview(featuredImage)} alt={title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Read more</button>
    </div>
  </div>
</div>
    </Link>
    </>
    
  )
}

export default PostCard
