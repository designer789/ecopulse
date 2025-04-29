declare module 'react-globe.gl' {
  import { RefObject } from 'react';

  interface GlobeMethods {
    controls: () => {
      autoRotate: boolean;
      autoRotateSpeed: number;
    };
    getGlobeRadius: () => number;
    scene: () => any; // THREE.Scene
    [key: string]: any;
  }

  interface GlobeProps {
    ref?: RefObject<GlobeMethods>;
    globeImageUrl?: string;
    bumpImageUrl?: string;
    animateIn?: boolean;
    // 添加其他你需要的props类型
    [key: string]: any;
  }

  const Globe: React.ComponentType<GlobeProps>;
  export default Globe;
} 