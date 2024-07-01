import React, { useState, useEffect } from "react";
import appwriteServices from "../appwrite/config";
import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

function AllPost() {
  const [posts, setPosts] = useState([]);
  // const [post, setPost] = useState(null);
  // const userData = useSelector((state) => state.auth.userData);
  // const isAuthor = posts.map((post)=>{
  //     if(post.$id ==userData.$id){
  //         setPosts(posts.documents)
  //         return true}
  //     return false
  // })

  useEffect(() => {
    appwriteServices.getALLPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        // setPost(posts)
      }
    });
  }, []);

  console.log("allpostcomp");
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex felx-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {/* {
                isAuthor ? (
                   <div className='flex felx-wrap'>
                    {posts.map((post)=>(
                   <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post}/>
                   </div>
            ))}
                   </div>
                ):(
                    <div className='bg-red-700'>
                        your post display here!!
                    </div>
                )
            } */}
      </Container>
    </div>
  );
}

export default AllPost;
