import { db } from '@/app/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  documentId
} from 'firebase/firestore';

export interface ChatMessage {
  id?: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
  conversationId: string;
  title?: string; // Add title field for conversations
}

// Save a chat message to Firestore
export const saveChatMessage = async (message: ChatMessage) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), message);
    return { id: docRef.id, ...message };
  } catch (error) {
    console.error("Error saving message:", error);
    throw new Error("Failed to save message. Please check your connection and try again.");
  }
};

// Get all messages for a specific conversation
export const getChatMessages = async (conversationId: string, userId: string) => {
  try {
    // IMPORTANT: Always filter by userId first to satisfy security rules
    const q = query(
      collection(db, 'messages'),
      where('userId', '==', userId),
      where('conversationId', '==', conversationId),
      orderBy('timestamp')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
  } catch (error) {
    console.error("Error getting messages:", error);
    throw new Error("Failed to retrieve messages. Please check your permissions and try again.");
  }
};

// Get chat history organized by conversation
export const getChatHistory = async (userId: string) => {
  try {
    // Always include userId in the query to satisfy security rules
    const q = query(
      collection(db, 'messages'),
      where('userId', '==', userId),
      orderBy('timestamp')
    );
    
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
    
    // Group messages by conversationId
    const conversations: Record<string, ChatMessage[]> = {};
    
    messages.forEach(message => {
      if (!conversations[message.conversationId]) {
        conversations[message.conversationId] = [];
      }
      conversations[message.conversationId].push(message);
    });
    
    return conversations;
  } catch (error) {
    console.error("Error getting chat history:", error);
    throw new Error("Error getting chat history: Please check your permissions and try again.");
  }
};

// Delete a conversation and all its messages
export const deleteConversation = async (conversationId: string, userId: string) => {
  try {
    // Get all messages for the conversation that belong to this user
    const messages = await getChatMessages(conversationId, userId);
    
    // Delete each message
    const deletePromises = messages.map(message => 
      deleteDoc(doc(db, 'messages', message.id as string))
    );
    
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw new Error("Failed to delete conversation. Please try again later.");
  }
};

// Create a new function to save conversation title
export const saveConversationTitle = async (conversationId: string, userId: string, title: string) => {
  try {
    // First, check if a title document already exists
    const titleCollection = collection(db, 'conversation_titles');
    const q = query(
      titleCollection,
      where('userId', '==', userId),
      where('conversationId', '==', conversationId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // No title document exists, create a new one
      await addDoc(titleCollection, {
        userId,
        conversationId,
        title,
        timestamp: Timestamp.now()
      });
    } else {
      // Update existing title document
      const titleDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'conversation_titles', titleDoc.id), {
        title,
        timestamp: Timestamp.now()
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error saving conversation title:", error);
    throw new Error("Failed to save conversation title. Please try again later.");
  }
};

// Get conversation titles
export const getConversationTitles = async (userId: string) => {
    try {
      // Make sure userId exists before making the query
      if (!userId) {
        console.error("User ID is required to fetch conversation titles");
        return {}; // Return empty object instead of throwing error
      }
      
      const q = query(
        collection(db, 'conversation_titles'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const titles: Record<string, string> = {};
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        titles[data.conversationId] = data.title;
      });
      
      return titles;
    } catch (error) {
      console.error("Error getting conversation titles:", error);
      // Return empty object instead of throwing error to prevent UI crashes
      return {};
    }
  };