import React from 'react'

const UserProfile = () => {
  return (
    <div>
      
    </div>
  )
}

export default UserProfile

// src/app/components/UserProfile.tsx
// "use client";
// import { useState } from 'react';

// import { UserAuth } from '@/app/context/AuthContext';

// const UserProfile = () => {
//   const { user } = UserAuth();
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (!user) {
//     return null;
//   }

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//       <div 
//         className="flex items-center cursor-pointer" 
//         onClick={toggleExpand}
//       >
//         <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
//           {user.photoURL ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img 
//               src={user.photoURL} 
//               alt={user.displayName || "User"} 
//               className="h-full w-full object-cover"
//             />
//           ) : (
//             <div className="h-full w-full bg-gray-300 flex items-center justify-center">
//               <span className="text-xl font-semibold text-gray-600">
//                 {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
//               </span>
//             </div>
//           )}
//         </div>
//         <div>
//           <h3 className="font-semibold text-lg">
//             {user.displayName || "Anonymous User"}
//           </h3>
//           <p className="text-sm text-gray-600">{user.email}</p>
//         </div>
//         <div className="ml-auto">
//           <svg 
//             className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24" 
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="mt-4 pt-4 border-t border-gray-200">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm font-medium text-gray-500">Account ID</p>
//               <p className="text-sm text-gray-900 truncate">{user.uid}</p>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Email Verified</p>
//               <p className="text-sm text-gray-900">
//                 {user.emailVerified ? (
//                   <span className="text-green-600">Verified</span>
//                 ) : (
//                   <span className="text-red-600">Not Verified</span>
//                 )}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Last Sign In</p>
//               <p className="text-sm text-gray-900">
//                 {user.metadata?.lastSignInTime 
//                   ? new Date(user.metadata.lastSignInTime).toLocaleString() 
//                   : "Unknown"}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">Account Created</p>
//               <p className="text-sm text-gray-900">
//                 {user.metadata?.creationTime 
//                   ? new Date(user.metadata.creationTime).toLocaleString() 
//                   : "Unknown"}
//               </p>
//             </div>
//           </div>

//           {user.providerData && user.providerData.length > 0 && (
//             <div className="mt-4">
//               <p className="text-sm font-medium text-gray-500 mb-2">Sign-in Provider</p>
//               <div className="flex items-center">
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   {user.providerData[0].providerId.replace(".com", "")}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;