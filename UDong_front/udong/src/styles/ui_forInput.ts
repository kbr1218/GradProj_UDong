import styled, { css, DefaultThemeColorKey } from "styled-components";
import theme from "./theme";

//텍스트
type StyleText = {
    margin?: string;
    color?: DefaultThemeColorKey;
    pointer?: boolean;
    borderBottom?: string;
};

export const Text = {
    SemiTitle: styled.div<StyleText>`
        font-weight: 600; // semi bold
        font-size: 30px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    BoldTitleS: styled.div<StyleText>`
        font-weight: 700;
        font-size: 22px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    SemiBodyS: styled.div<StyleText>`
        font-weight: 600; // semi bold
        font-size: 16px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    SemiBodyM: styled.div<StyleText>`
        font-weight: 700; // semi bold
        font-size: 18px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    SemiBodyB: styled.div<StyleText>`
        font-weight: 600; // semi bold
        font-size: 30px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MediBodyS: styled.div<StyleText>`
        font-weight: 500; // medium
        font-size: 16px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    MediBodyB: styled.div<StyleText>`
        font-weight: 500; // medium
        font-size: 30px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
    RegulBody: styled.div<StyleText>`
        font-weight: 400; // regular
        font-size: 14px;
        display: inline-block;
        margin: ${props => props.margin};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

//인풋
type StyleInput = {
    width?: string;
    height?: string;
    fontSize?: string;
    error?: boolean;
    margin?: string;
    color?: DefaultThemeColorKey;
    backgroundColor?: DefaultThemeColorKey;
};

export const Input = {
    FormInput: styled.input<StyleInput>`
        width: 180x;
        height: 50px;
        font-size: ${props => props.fontSize};
        color: ${({ color }) => (color ? theme.colors[color] : theme.colors.black)};
        font-weight: 400;
        outline: none;
        display: flex;
        justify-content: flex-end;
        padding: 0 0 0 15px;
        background-color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        border: 0px;
        border-bottom: 1px solid ${props => (props.error ? `${theme.colors.red}` : `gray`)};
        margin-bottom: 29px;
    `,
    CheckBoxInput: styled.input<StyleInput>`
        width: 15px;
        height: 16px;
        margin-right: 15px;
        outline: none;
        border-radius: 4px;
        border: 0;
        background-color: ${({ color }) => (color ? theme.colors[color] : theme.colors)};
        border: 1px solid ${props => (props.error ? `${theme.colors.red}` : `${theme.colors.gray200}`)};
    `,
};

//기타 재사용되는 블록들
type StyleBlock = {
    margin?: string;
    padding?: string;
    pointer?: boolean;
    display?: string;
    direction?: string;
    justifyContent?: string;
    alignItems?: string;
    width?: string;
    height?: string;
    color?: DefaultThemeColorKey | string;
    bgColor?: DefaultThemeColorKey;
    border?: string;
    borderRadius?: string;
    bgImg?: string;
    bgSize?: string;
    gap?: string;
    position?: string;
    background?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    relative?: boolean;
    zIndex?: string;
    boxShadow?: string;
};
export const Block = {
    AppWrapper: styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    ServiceWrapper: styled.div`
        width: 375px;
        min-width: 360px;
        height: 812px;
        /* border: 1px solid red; */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid red;
    `,
    PageWrapper: styled.div<StyleBlock>`
        width: 100%;
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
    `,
    PageLayout: styled.div<StyleBlock>`
        width: 900px;
        height: auto;
    `,
    FormWrapper: styled.div<StyleBlock>`
        width: 400px;
        height: auto;
    `,
    Form: styled.form`
        width: 100%;
        height: auto;
    `,
    FormInputSection: styled.section<StyleBlock>`
        position: relative;
        margin: ${props => props.margin};
    `,
    ErrorMessage: styled.div<StyleBlock>`
        width: 100%;
        position: absolute;
        top: 35px;
        display: inline-block;
    `,
    Box: styled.div<StyleBlock>`
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        cursor: ${props => props.pointer && "pointer"};
        display: flex;
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        margin: ${props => props.margin};
        padding: ${props => props.padding};
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        position: ${props => props.relative && "relative"};
        z-index: ${props => props.zIndex};
        position: ${props => props.position};
        padding: ${props => props.padding};
        box-shadow: ${props => props.boxShadow};
        gap: ${props => props.gap};
    `,
    ColumnBox: styled.div<StyleBlock>`
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        cursor: ${props => props.pointer && "pointer"};
        display: flex;
        flex-direction: column;
        justify-content: ${props => props.justifyContent};
        align-items: ${props => props.alignItems};
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
        margin: ${props => props.margin};
        border: ${props => props.border};
        border-radius: ${props => props.borderRadius};
        background-image: ${props => props.bgImg};
        background-size: ${props => props.bgSize};
        position: ${props => props.position};
        background: ${props => props.background};
        background-size: cover;
        background-position: center;
        z-index: ${props => props.zIndex};
        position: ${props => props.position};
        box-shadow: ${props => props.boxShadow};
        padding: ${props => props.padding};
        gap: ${props => props.gap};
    `,
    AbsoluteBox: styled.div<StyleBlock>`
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        cursor: ${props => props.pointer && "pointer"};
        position: absolute;
        top: ${props => props.top};
        right: ${props => props.right};
        bottom: ${props => props.bottom};
        left: ${props => props.left};
        z-index: ${props => props.zIndex};
        background-color: ${props => props.bgColor};
        border-radius: ${props => props.borderRadius};
        border: ${props => props.border};
    `,
    Bar: styled.div<StyleBlock>`
        width: 100%;
        height: ${props => props.height};
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
    `,
    Img: styled.img<StyleBlock>`
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        margin: ${props => props.margin};
        cursor: ${props => props.pointer && "pointer"};
    `,
};

//버튼
type StyleButton = {
    width?: string;
    height?: string;
    margin?: string;
    border?: string;
    borderRadius?: string;
    color?: DefaultThemeColorKey;
    bgColor?: DefaultThemeColorKey;
    opacity?: string;
    backdropFilter?: string;
    filter?: string;
    boxShadow?: string;
};

export const Button = {
    Button: styled.button<StyleButton>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
        color: ${theme.colors.white};
        border: none;

        margin: ${props => props.margin};
        cursor: pointer;
    `,
    RadiusButton: styled.button<StyleButton>`
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${props => (props.width ? props.width : "100%")};
        height: ${props => (props.width ? props.height : "auto")};
        background-color: ${({ bgColor }) => (bgColor ? theme.colors[bgColor] : theme.colors)};
        color: ${theme.colors.white};
        border: none;
        margin: ${props => props.margin};
        border-radius: ${props => props.borderRadius};
        cursor: pointer;
    `,
};

// 마진
type StyleMargin = {
    size: number;
    direction: "row" | "column";
};

export const Margin = styled.div<StyleMargin>`
    height: ${({ direction, size }) => (direction === "column" ? size : 0)}px;
    width: ${({ direction, size }) => (direction === "column" ? 0 : size)}px;
`;

type FlexBoxProperty = {
    justifyContents?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    alignItems?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    gap?: number;
    column?: boolean;
    wrap?: boolean;
    width?: number | string;
    height?: number | string;
    minHeight?: string;
    maxHeight?: string;
    doNotShowScrollBar?: boolean;
};

export const FlexBox = styled.div<FlexBoxProperty>`
    width: ${({ width }) => (width ? (typeof width === "string" ? width : `${width}px`) : `100%`)};
    height: ${({ height }) => (height ? (typeof height === "string" ? height : `${height}px`) : `auto`)};
    min-height: ${({ minHeight }) => (minHeight ? minHeight : 0)};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "none")};
    display: flex;
    flex-direction: ${({ column }) => (column ? "column" : "row")};
    gap: ${({ gap }) => (gap ? gap : 0)}px;
    justify-content: ${({ justifyContents }) => (justifyContents ? justifyContents : "flex-start")};
    align-items: ${({ alignItems }) => (alignItems ? alignItems : "stretch")};
    flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};
    ${({ doNotShowScrollBar }) =>
        doNotShowScrollBar &&
        css`
            -ms-overflow-style: none;
            ::-webkit-scrollbar {
                display: none;
            }
        `}
`;
