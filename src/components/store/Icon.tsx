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