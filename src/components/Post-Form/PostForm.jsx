import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const Submit = async (data) => {
    if (post) {
      console.log("submit");
      const file = data.image[0]
        ? await appwriteService.uplodeFile(data.image[0])
        : null;
      
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = appwriteService.updatPost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } 
    else {
      const file = await appwriteService.uplodeFile(data.image[0]);

      if (file) {
        const fileID = file.$id;
        data.featuredImage = fileID;
        const dbPost = await appwriteService.createPost({
          ...data,
          userID: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue(
        'slug',slugTransform(value.title),
        {shouldValidate:true}
      );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
  <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap text-[18px] text-white">
  <div className="w-2/3 px-2">
      <Input
         type="text"
          className="input input-bordered w-full max-w-xs ml-4 mb-2 bg-base-100"
          label="Title :"
          placeholder="Title"
          // className="mb-4"
          {...register("title", { required: true })}
      />
      <Input
          type="text"
          className="input input-bordered w-full max-w-xs ml-4"
          label="Slug :"
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
      />
      {/* <input  placeholder="Type here"  /> */}
      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      
      <Button type="submit" className={`btn  w-full ${post ? "bg-blue-500" : "btn-success"}`}>
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>);
}

export default PostForm;
