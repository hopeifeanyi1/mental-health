import { IconProps } from "@/types";

export const SendIcon : React.FC<IconProps> = ({className}) => {
    return (
        <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <mask id="mask0_2020_44" maskUnits="userSpaceOnUse" x="0" y="0" width="76" height="76">
        <rect y="31.735" width="53.6644" height="53.6644" transform="rotate(-36.2535 0 31.735)" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_2020_44)">
        <path d="M31.8554 63.831L23.9216 53.0121L35.7022 38.8275L18.6325 45.7996L10.6987 34.9807L55.5367 24.2824L31.8554 63.831Z" fill="white"/>
        </g>
        </svg>            
    );
  };

  export const LoginLoading = () => {
    return (
      <svg className=" h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.9342 16.0659L6.87354 17.1265" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.9342 7.93413L6.87354 6.87347" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    );
  };
  
  export const Dot : React.FC<IconProps> = ({className}) => {
    return (
        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"/></svg>
    );
  };
