import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page

// src/app/chat/page.tsx
// "use client";
// import ProtectedRoute from '@/components/store/ProtectedRoute';
// import UserProfile from '@/components/store/UserProfile';
// import { UserAuth } from '@/app/context/AuthContext';

// export default function ChatPage() {
  
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { user, logOut } = UserAuth();

//   const handleSignOut = async () => {
//     try {
//       await logOut();
//       // Redirect happens automatically in the AuthContext
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-800">Easy Therapy Chat</h1>
//             <button 
//               onClick={handleSignOut}
//               className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
//             >
//               Sign Out
//             </button>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {/* Sidebar with user profile */}
//             <div className="md:col-span-1">
//               <UserProfile />
              
//               {/* You can add more sidebar elements here */}
//               <div className="bg-white rounded-lg shadow-md p-4">
//                 <h3 className="font-medium text-gray-700 mb-2">Chat History</h3>
//                 {/* Chat history items would go here */}
//                 <div className="text-sm text-gray-500">No previous chats</div>
//               </div>
//             </div>
            
//             {/* Main chat area */}
//             <div className="md:col-span-3">
//               <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
//                 {/* Chat messages would go here */}
//                 <div className="flex-1 p-4 overflow-y-auto">
//                   <div className="flex justify-center items-center h-full text-gray-500">
//                     Start a new conversation
//                   </div>
//                 </div>
                
//                 {/* Chat input */}
//                 <div className="border-t border-gray-200 p-4">
//                   <div className="flex">
//                     <input
//                       type="text"
//                       placeholder="Type your message..."
//                       className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition">
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
