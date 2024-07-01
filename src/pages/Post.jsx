import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    console.log(isAuthor);
    // console.log(userData);

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full h-full flex justify-center mb-4 relative border-2 rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-2/4  h-1/2"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 ">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button  classname=" btn btn-info mr-1 "  >
                                    Edit
                                </Button>
                            </Link>
                            <Button  classname="btn btn-error btn-active"  onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className=" border-2 p-2 rounded-xl" >

                <div className="w-full mb-6">
                    <h1 className="text-4xl font-bold text-white text-center">{post.title}</h1>
                </div>
                <div className="text-white text-xl font-mono" >
                    {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}