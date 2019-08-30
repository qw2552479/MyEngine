namespace QE {

    export interface Resolution {
        height: number;
        width: number;
        refreshRate: number;
    }

    export class Screen {

        public static screenWidth = 0;
        public static screenHeight = 0;

        public static currentResolution: Resolution;
        public static dpi: number;
        public static fullScreen: boolean;

    }

}
