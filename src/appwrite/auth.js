import conf from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //if user account is created , then proceed to login
       return  this.login({ email, password });
      } else {
        return userAccount;
      }
    } 
    catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {

      const session=await this.account.createEmailPasswordSession(email, password);
      console.log(session);
      return session
      
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite error:: getCurrentUser:: error", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite error:: logout::error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
