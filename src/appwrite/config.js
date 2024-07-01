import conf from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
    .setEndpoint(conf.appwriteURL)
    .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userID,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite::config::error::createPost::error", error);
    }
  }

  async updatPost(slug, { title, content, featuredImage,userID, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          userID,
        }
      );
    } catch (error) {
      console.log("appwrite::config::error::updatePost::error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite::config::error::deletePost::error", error);
      return false;
    }
  }

  
  async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
}

  async getALLPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("appwrite::config::error::getALLPost::error", error);
      return false;
    }
  }

  //file uplode services
  async uplodeFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite::config::error::uplodeFile::error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.createFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite::config::error::deleteFile::error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
