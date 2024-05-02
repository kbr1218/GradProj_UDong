import "styled-components";

declare module "styled-components" {
    export type DefaultThemeColorKey =
        | "black"
        | "white"
        | "red"
        | "gray100"
        | "gray200"
        | "gray300"
        | "gray400"
        | "mainYellow"
        | "yellow"
        | "mainGreen"
        | "green100"
        | "green200"
        | "lightBlue"
        | "newYNB100"
        | "newYNB200"
        | "newYNB300"
        | "newYNB400"
        | "newYNB500"
        | "re100"
        | "re200"
        | "re300"
        | "re400"
        | "re500"
        | "createRoomBtn"
        | "inviteBtn";

    export interface DefaultTheme {
        colors: {
            [key in DefaultThemeColorKey]: string;
        };
    }
}
