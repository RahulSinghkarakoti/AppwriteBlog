import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PostForm, Container } from "../components";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate;

  useEffect(() => {
    if (slug) {
      console.log("editpost");
      appwriteService.getPost(slug).then((post) => {
        setPost(post);
      });
    } else {
      // navigate("/");
    }
  }, [navigate, slug]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
