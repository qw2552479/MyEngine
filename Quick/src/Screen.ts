namespace QuickEngine {

    export interface Resolution
    {
        height: number;
        width: number;
        refreshRate: number;        
    }

    export class Screen {
        
        public static screenWidth: number = 0;
        public static screenHeight: number = 0;

        public static currentResolution: Resolution;
        public static dpi: number;
        public static fullScreen: boolean;
     
    }

}