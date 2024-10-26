import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.woksenterprise.aoraClone',
    projectId: '671d05b100021e53f435',
    databaseId: '671d07640033ab65d063',
    userCollectionId: '671d07d500117727fc4a',
    videoCollectionId: '671d07f80012ebaa599d',
    storageId: '671d0b2c000a5cb28aab'
}


// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);

export const createUser = async(email, password, username)=>{
    try {
       const newAccount =  await account.create(ID.unique(),email, password, username );
       if(!newAccount) throw new Error;
       
       const avatarUrl = avatars.getInitials(username);
    //    await signin(email, password);
       const newUser = await databases.createDocument(
        appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
       )
       return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
// Register User

export async function signin(email, password){
try {
    
    const session = await account.createEmailPasswordSession(email, password);
    return session;
} catch (error) {
    console.log(error);
    throw new Error(error)
}
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser){
            throw Error
        }
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

